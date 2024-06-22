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
`,
  3: `
const float dots = 20.0;
const vec2 center = vec2(0, 0);
const float SQRT_2 = 1.414213562373;
vec4 transition(vec2 uv) {
  bool nextImage = distance(fract(uv * dots), vec2(0.5, 0.5)) < ( progress / distance(uv, center));
  return nextImage ? getToColor(uv) : getFromColor(uv);
}
`,
  4: `#ifdef GL_ES
precision mediump float;
#endif

const float scale = 4.0;
const float smoothness = 0.01;

const float seed = 12.9898;

float random(vec2 co)
{
    highp float a = seed;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}
    
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

vec4 transition (vec2 uv) {
  vec4 from = getFromColor(uv);
  vec4 to = getToColor(uv);
  float n = noise(uv * scale);
  
  float p = mix(-smoothness, 1.0 + smoothness, progress);
  float lower = p - smoothness;
  float higher = p + smoothness;
  
  float q = smoothstep(lower, higher, n);
  
  return mix(
    from,
    to,
    1.0 - q
  );
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
