import {ActivityIndicator, RefreshControl, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppContainer from '@/Components/AppContianer';
import UserItem from './Components/UserItem';
import {CommonStyle} from '@/Helpers';
import Animated, {LinearTransition} from 'react-native-reanimated';
import _ from 'lodash';
function getRandomScore() {
  return Math.floor(Math.random() * 100) + 1;
}

function generateSampleData() {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      profileImage: `https://picsum.photos/200/200?random=${i}`,
      score: getRandomScore(),
    });
  }
  return data;
}

const initialData = generateSampleData();
export type UserType = (typeof initialData)[0];
function fetchData() {
  return new Promise<UserType[]>(resolve => {
    // Simulating an asynchronous call (e.g., fetching data from a server)
    setTimeout(() => {
      const updatedData = initialData.map(item => ({
        ...item,
        score: getRandomScore(), // Update score only
      }));
      resolve(updatedData);
    }, 1000); // Simulated delay of 1 second
  });
}

const AnimatedListUserScreen = () => {
  const [users, setUsers] = useState<UserType[]>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setISLoading] = useState(true);
  const fetchAPIData = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setISLoading(true);
    }

    const data = await fetchData();
    data.sort((a, b) => b.score - a.score);
    setUsers(_.orderBy(JSON.parse(JSON.stringify(data)), 'score', 'desc'));
    setIsRefreshing(false);
    setISLoading(false);
  }, []);

  useEffect(() => {
    fetchAPIData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressDelete = useCallback(
    (id: number) => {
      let clone = JSON.parse(JSON.stringify(users));
      clone = _.filter(clone, i => i.id !== id);
      setUsers(clone);
    },
    [users],
  );

  return (
    <AppContainer>
      {isLoading ? (
        <View style={CommonStyle.centerFlex}>
          <ActivityIndicator />
        </View>
      ) : (
        <Animated.FlatList
          itemLayoutAnimation={LinearTransition.springify().duration(5000)}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => fetchAPIData(true)}
            />
          }
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <UserItem
              item={item}
              index={index}
              onPressDelete={() => onPressDelete(item.id)}
            />
          )}
        />
      )}
    </AppContainer>
  );
};

export default AnimatedListUserScreen;