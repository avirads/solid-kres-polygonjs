
// INSERT DEFINES

#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>



// /geo1/MAT/meshStandardBuilder_BLOCKS/checkers1
// https://iquilezles.org/articles/checkerfiltering/
float checkers(vec2 p) {
	vec2 s = sign(fract(p*.5)-.5);
	return .5 - .5*s.x*s.y;
}
float checkersGrad( in vec2 p, in vec2 ddx, in vec2 ddy )
{
    // filter kernel
    vec2 w = max(abs(ddx), abs(ddy)) + 0.01;
    // analytical integral (box filter)
    vec2 i = 2.0*(abs(fract((p-0.5*w)/2.0)-0.5)-abs(fract((p+0.5*w)/2.0)-0.5))/w;
    // xor pattern
    return 0.5 - 0.5*i.x*i.y;
}








// /geo1/MAT/meshStandardBuilder_BLOCKS/globals1
varying vec3 v_POLY_globals1_position;




#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>

struct SSSModel {
	bool isActive;
	vec3 color;
	float thickness;
	float power;
	float scale;
	float distortion;
	float ambient;
	float attenuation;
};

void RE_Direct_Scattering(
	const in IncidentLight directLight,
	const in GeometricContext geometry,
	const in SSSModel sssModel,
	inout ReflectedLight reflectedLight
	){
	vec3 scatteringHalf = normalize(directLight.direction + (geometry.normal * sssModel.distortion));
	float scatteringDot = pow(saturate(dot(geometry.viewDir, -scatteringHalf)), sssModel.power) * sssModel.scale;
	vec3 scatteringIllu = (scatteringDot + sssModel.ambient) * (sssModel.color * (1.0-sssModel.thickness));
	reflectedLight.directDiffuse += scatteringIllu * sssModel.attenuation * directLight.color;
}

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#include <map_fragment>
	#include <alphamap_fragment>



	// /geo1/MAT/meshStandardBuilder_BLOCKS/constant1
	vec3 v_POLY_constant1_val = vec3(0.0006070539670588235, 0.051269458367115384, 0.0009105809505882353);
	
	// /geo1/MAT/meshStandardBuilder_BLOCKS/constant2
	vec3 v_POLY_constant2_val = vec3(0.01680737574872402, 0.25818285291079235, 0.13843161502267545);
	
	// /geo1/MAT/meshStandardBuilder_BLOCKS/vec3ToFloat1
	float v_POLY_vec3ToFloat1_x = v_POLY_globals1_position.x;
	float v_POLY_vec3ToFloat1_y = v_POLY_globals1_position.y;
	
	// /geo1/MAT/meshStandardBuilder_BLOCKS/floatToVec2_1
	vec2 v_POLY_floatToVec2_1_vec2 = vec2(v_POLY_vec3ToFloat1_x, v_POLY_vec3ToFloat1_y);
	
	// /geo1/MAT/meshStandardBuilder_BLOCKS/checkers1
	vec2 v_POLY_checkers1_coord = v_POLY_floatToVec2_1_vec2*vec2(1.0, 1.0)*2.1;
	float v_POLY_checkers1_checker = checkersGrad(v_POLY_checkers1_coord, dFdx(v_POLY_checkers1_coord), dFdy(v_POLY_checkers1_coord));
	
	// /geo1/MAT/meshStandardBuilder_BLOCKS/mix1
	vec3 v_POLY_mix1_mix = mix(v_POLY_constant1_val, v_POLY_constant2_val, v_POLY_checkers1_checker);
	
	// /geo1/MAT/meshStandardBuilder_BLOCKS/output1
	diffuseColor.xyz = v_POLY_mix1_mix;
	float POLY_metalness = 1.0;
	float POLY_roughness = 1.0;
	vec3 POLY_emissive = vec3(1.0, 1.0, 1.0);
	SSSModel POLY_SSSModel = SSSModel(/*isActive*/false,/*color*/vec3(1.0, 1.0, 1.0), /*thickness*/0.1, /*power*/2.0, /*scale*/16.0, /*distortion*/0.1,/*ambient*/0.4,/*attenuation*/0.8 );




	// INSERT BODY

	#include <alphatest_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
