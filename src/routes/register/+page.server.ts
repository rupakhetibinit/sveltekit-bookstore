import { invalid, redirect } from '@sveltejs/kit';

import type { Action, Actions, PageServerLoad } from './$types';

import argon2 from 'argon2';

import { db } from '$lib/database';

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export const load: PageServerLoad = async () => {
	//todo
};

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');
	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true });
	}

	const foundUser = await db.user.findUnique({
		where: {
			username: username
		}
	});
	if (foundUser) {
		return invalid(400, { user: true });
	}
	const hashedPassword = await argon2.hash(password);

	await db.user.create({
		data: {
			username: username,
			hashedPassword: hashedPassword,
			sessionId: crypto.randomUUID(),
			role: {
				connect: {
					name: Roles.USER
				}
			}
		}
	});

	throw redirect(303, '/login');
};

export const actions: Actions = { register };
