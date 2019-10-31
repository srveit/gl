import Geometry from './Geometry.mjs';
import { memoize } from '../internal/utils.mjs';

const PI = Math.PI;
const PI2 = PI * 2;

function create_smooth_geometry(turns, turns_chord) {
	const num_vertices = (turns + 1) * (1 + 1);
	const num_faces_per_turn = 2 * 1;
	const num_faces = num_faces_per_turn * turns;

	const position = new Float32Array(num_vertices * 3); // doubles as normal
	const uv = new Float32Array(num_vertices * 2);
	const index = new Uint32Array(num_faces * 3);

	let position_index = 0;
	let uv_index = 0;

	for (let i = 0; i <= turns; i += 1) {
		const u = i / turns * turns_chord;

		for (let v = 0; v <= 1; v += 1) {
			const x = -Math.cos(u * PI2);
			const y = Math.cos(v * PI);
			const z = Math.sin(u * PI2);

			position[position_index++] = x;
			position[position_index++] = y;
			position[position_index++] = z;

			uv[uv_index++] = u;
			uv[uv_index++] = v;
		}
	}

	let face_index = 0;

	for (let i = 0; i < turns; i += 1) {
		const offset = i * 2;

		index[face_index++] = offset + 0; // top
		index[face_index++] = offset + 1; // bottom
		index[face_index++] = offset + 3; // next bottom

		index[face_index++] = offset + 0; // top
		index[face_index++] = offset + 3; // next bottom
		index[face_index++] = offset + 2; // next top
	}

	return new Geometry({
		position: {
			data: position,
			size: 3
		},
		normal: {
			data: position,
			size: 3
		},
		uv: {
			data: uv,
			size: 2
		}
	}, {
		index
	});
}

function create_flat_geometry(turns, turns_chord) {
	throw new Error('TODO implement flat geometry');
}

export default memoize(({ turns = 8, turns_chord = 1, shading = 'smooth' } = {}) => {
	return shading === 'smooth'
		? create_smooth_geometry(turns, turns_chord)
		: create_flat_geometry(turns, turns_chord);
});
