const transitions: Record<string, string> = {
  0: `vec4 transition(vec2 UV) {
	float Radius = 1.0;

	float T = progress;

	UV -= vec2( 0.5, 0.5 );

	float Dist = length(UV);

	if ( Dist < Radius )
	{
		float Percent = (Radius - Dist) / Radius;
		float A = ( T <= 0.5 ) ? mix( 0.0, 1.0, T/0.5 ) : mix( 1.0, 0.0, (T-0.5)/0.5 );
		float Theta = Percent * Percent * A * 8.0 * 3.14159;
		float S = sin( Theta );
		float C = cos( Theta );
		UV = vec2( dot(UV, vec2(C, -S)), dot(UV, vec2(S, C)) );
	}
	UV += vec2( 0.5, 0.5 );

	vec4 C0 = getFromColor(UV);
	vec4 C1 = getToColor(UV);

	return mix( C0, C1, T );
}`,
  1: `
const float smoothness = 0.5;
const vec2 center = vec2(0.5, 0.5);
const vec2 direction = vec2(-1.0, 1.0); 
const float amplitude = 30;
const float speed = 30;

vec4 transition(vec2 p) {
  vec2 dir = p - vec2(.5);
  float dist = length(dir);

  if (dist > progress) {
    return mix(getFromColor( p), getToColor( p), progress);
  } else {
    vec2 offset = dir * sin(dist * amplitude - progress * speed);
    return mix(getFromColor( p + offset), getToColor( p), progress);
  }
}
`,
  2: `
const float smoothness = 0.5;
const vec2 center = vec2(0.5, 0.5);
const vec2 direction = vec2(-1.0, 1.0); 

vec4 transition (vec2 uv) {
  vec2 v = normalize(direction);
  v /= abs(v.x) + abs(v.y);
  float d = v.x * center.x + v.y * center.y;
  float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
  return mix(getFromColor((uv - 0.5) * (1.0 - m) + 0.5), getToColor((uv - 0.5) * m + 0.5), m);
}
`
}

export default (index: string | number) => `uniform shader image1;
uniform shader image2;

uniform float progress;
uniform float2 resolution;

half4 getFromColor(float2 uv) {
return image1.eval(uv * resolution);
}

half4 getToColor(float2 uv) {
return image2.eval(uv * resolution);
}

${transitions[index]}


half4 main(vec2 xy) {
vec2 uv = xy / resolution;
return transition(uv);
}`
