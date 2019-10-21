// schema validator
import * as Yup from 'yup';

import Registration from '../models/Registration';

class RegistrationController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string()
				.email()
				.required(),
			age: Yup.number()
				.required()
				.integer()
				.positive(),
			weight: Yup.number()
				.required()
				.positive(),
			height: Yup.number()
				.required()
				.positive(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const registrationExists = await Registration.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (registrationExists) {
			return res.status(400).json({ error: 'Registration already exists' });
		}

		const { id, name, email, age, weight, height } = await Registration.create(
			req.body
		);

		return res.json({
			id,
			name,
			email,
			age,
			weight,
			height,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string()
				.email()
				.required(),
			age: Yup.number()
				.integer()
				.positive(),
			weight: Yup.number().positive(),
			height: Yup.number().positive(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { email } = req.body;

		const registration = await Registration.findByPk(req.userId);

		if (email !== registration.email) {
			const userExists = await Registration.findOne({
				where: { email },
			});

			if (userExists) {
				return res.status(400).json({ error: 'Registration already exists.' });
			}
		}

		const registrationFields = await registration.update(req.body);

		return res.json(registrationFields);
	}
}

export default new RegistrationController();
