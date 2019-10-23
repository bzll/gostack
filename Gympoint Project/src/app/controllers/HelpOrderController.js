import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
	async index(req, res) {
		if (req.params.studentId) {
			const helpOrders = await HelpOrder.findAll({
				where: {
					student_id: req.params.studentId,
				},
			});

			return res.json(helpOrders);
		}

		const helpOrders = await HelpOrder.findAll({
			where: {
				answer_at: null,
			},
		});

		if (!helpOrders) {
			return res.status(400).json({ error: 'Not found any help-orders' });
		}

		return res.json(helpOrders);
	}

	async store(req, res) {
		console.log(req);
	}
}

export default new HelpOrderController();
