// schema validator
import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
	async index(req, res) {
		const plans = await Plan.findAll();

		if (!plans) {
			return res.status(400).json({ error: 'Not found any plan.' });
		}
		return res.json(plans);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			duration: Yup.integer()
				.required()
				.positive(),
			price: Yup.number()
				.required()
				.integer()
				.positive(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { id, title, duration, price } = await Plan.create(req.body);

		return res.json({
			id,
			title,
			duration,
			price,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			duration: Yup.integer()
				.required()
				.positive(),
			price: Yup.number()
				.required()
				.integer()
				.positive(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { duration } = req.body;

		const plan = await Plan.findByPk(duration);

		const data = plan.update(req.body);
		return res.json(data);
	}

	async delete(req, res) {
		const { duration } = req.body;

		const plan = await Plan.findByPk(duration);
		plan
			.destroy()
			.then(deletedRecord => {
				if (deletedRecord === 1) {
					res.status(200).json({ message: 'Deleted sucessfully' });
				} else {
					res.status(404).json({ message: 'Record not found' });
				}
			})
			.catch(error => {
				res.status(500).json(error);
			});
	}
}

export default new PlanController();
