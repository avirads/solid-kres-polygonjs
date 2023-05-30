
// INSERT DEFINES

#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>



// /env/MAT/meshLambertBuilder_INSTANCES/hsvToRgb1
// https://github.com/hughsk/glsl-hsv2rgb
// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}







// /env/MAT/meshLambertBuilder_INSTANCES/attribute1
varying float v_POLY_attribute_id;




#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#include <map_fragment>
	#include <alphamap_fragment>



	// /env/MAT/meshLambertBuilder_INSTANCES/attribute1
	float v_POLY_attribute1_val = v_POLY_attribute_id;
	
	// /env/MAT/meshLambertBuilder_INSTANCES/round1
	float v_POLY_round1_val = sign(v_POLY_attribute1_val)*floor(abs(v_POLY_attribute1_val)+0.5);
	
	// /env/MAT/meshLambertBuilder_INSTANCES/floatToVec2_1
	vec2 v_POLY_floatToVec2_1_vec2 = vec2(v_POLY_round1_val, 0.0);
	
	// /env/MAT/meshLambertBuilder_INSTANCES/random1
	float v_POLY_random1_rand = rand(v_POLY_floatToVec2_1_vec2);
	
	// /env/MAT/meshLambertBuilder_INSTANCES/floatToVec3_1
	vec3 v_POLY_floatToVec3_1_vec3 = vec3(v_POLY_random1_rand, 0.71, 0.82);
	
	// /env/MAT/meshLambertBuilder_INSTANCES/hsvToRgb1
	vec3 v_POLY_hsvToRgb1_rgb = hsv2rgb(v_POLY_floatToVec3_1_vec3);
	
	// /env/MAT/meshLambertBuilder_INSTANCES/output1
	diffuseColor.xyz = v_POLY_hsvToRgb1_rgb;




	// INSERT BODY

	#include <alphatest_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
