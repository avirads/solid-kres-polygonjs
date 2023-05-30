
// INSERT DEFINES


#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

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
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif


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
	// the new body lines should be added before the alphatest_fragment
	// so that alpha is set before (which is really how it would be set if the alphamap_fragment above was used by the material node parameters)

	#include <alphatest_fragment>

	#include <logdepthbuf_fragment>


	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), diffuseColor.a );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#endif

}
