export default "varying vec3 vnormal;\n\nvoid main () {\n\tvec3 light = vec3(0.0, 0.0, 0.0);\n\n\tfor (int i = 0; i < 8; i += 1) {\n\t\tvec3 direction = DIRECTIONAL_LIGHTS_DIRECTION[i];\n\t\tvec4 color = DIRECTIONAL_LIGHTS_COLOR[i];\n\n\t\tfloat multiplier = clamp(dot(vnormal, direction), 0.0, 1.0);\n\t\tlight += multiplier * color.rgb * color.a;\n\t}\n\n\tgl_FragColor = COLOR;\n\tgl_FragColor.rgb *= mix(AMBIENT_LIGHT, vec3(1.0, 1.0, 1.0), light);\n}";