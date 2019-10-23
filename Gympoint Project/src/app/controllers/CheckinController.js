import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';

class CheckinController {
	async index(req, res) {
		const checkins = await Checkin.findAll({
			where: {
				student_id: req.params.studentId,
			},
		});
		return res.json(checkins);
	}

	async store(req, res) {
		const checkins = await Checkin.findAll({
			where: {
				student_id: req.params.studentId,
				date: {
					[Op.between]: [subDays(new Date(), 7), new Date()],
				},
			},
		});

		if (checkins.length >= 5) {
			return res.status(400).json({
				error: 'You already made the limit (5) in a week of checkins',
			});
		}
		await Checkin.create({
			student_id: req.params.studentId,
		});

		return res.status(200).json({ message: 'Created with sucessful.' });
	}
}

export default new CheckinController();
