import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import Subscriber from '../model/subscriber';

router.get('/', async (req, res) => {
	try {
		const subscribers = await Subscriber.find();
		res.status(200).json(subscribers);
	} catch (err) {
		res.status(500).json(err);
	}
});

// TODO: change res: any
router.get('/:id', getSubscriber, (req, res: any) => {
	res.send(res.subscriber);
});

router.post('/', async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		subscribedToChannel: req.body.subscribedToChannel
	});
	try {
		const newSubscriber = await subscriber.save()
		res.status(201).json(newSubscriber);
	} catch (err) {
		res.status(400).json(err);
	}
});

// TODO: change res: any
router.patch('/:id', getSubscriber, async (req, res: any) => {
	if (req.body.name != null) {
		res.subscriber.name = req.body.name;
	}
	if (req.body.name != null) {
		res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
	}
	try {
		const updatedSubscriber = await res.subscriber.save();
		res.json(updatedSubscriber);
	} catch (err) {
		res.status(400).json(err);
	}
});

// TODO: change res: any
router.delete('/:id', getSubscriber, async (req, res: any) => {
	try {
		await res.subscriber.remove();
		res.json({ message: 'Deleted subscriber' });
	} catch (err) {
		res.status(500).json(err);
	}
});

// TODO: change res: any
async function getSubscriber(req: Request, res: any, next: NextFunction): Promise<any> {
	let subscriber;
	try {
		subscriber = await Subscriber.findById(req.params.id);
		if (subscriber == null) {
			return res.status(404).json({ message: 'Cannot find subscriber' });
		}
	} catch (err) {
		return res.status(500).json(err);
	}

	res.subscriber = subscriber;
	next();
}


export default router;