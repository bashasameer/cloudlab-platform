const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'cloudlab-api',
    message: 'CloudLab Platform API is running'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.get('/api/v1/labs', (req, res) => {
  res.json({
    labs: [
      { id: 'kubernetes-basics', name: 'Kubernetes Basics', status: 'available' },
      { id: 'terraform-aws', name: 'Terraform on AWS', status: 'planned' },
      { id: 'observability', name: 'Kubernetes Observability', status: 'planned' }
    ]
  });
});

app.listen(port, () => {
  console.log(`CloudLab API listening on port ${port}`);
});
