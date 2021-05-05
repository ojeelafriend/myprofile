exports.success = (req, res, notice, status) => {
	res.status(status || 200).send({
		error: 'None',
		body: notice,
	});
};

exports.errors = (req, res, error, status, details) => {
	console.error(details);
	res.status(status || 500).send({
		error: error,
		body: 'None',
	});
};
