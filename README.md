# CloudLab Platform

A learning-focused Internal Developer Platform built with Node.js, AWS, Terraform, Amazon EKS, GitLab CI/CD, and Argo CD.

## Goal

CloudLab lets users request isolated lab environments while the platform team manages the underlying AWS and Kubernetes infrastructure. The repository is intentionally built in phases so each layer can be learned before adding the next one.

## Target Architecture

```text
User
  |
  v
Node.js CloudLab API
  |
  v
Amazon EKS
  |
  +-- namespace/user-a
  +-- namespace/user-b
  +-- namespace/user-c

Infrastructure path:
GitLab CI -> Terraform -> AWS -> VPC/ECR/EKS/IAM

Application path:
GitLab CI -> Test -> Docker -> ECR -> GitOps -> Argo CD -> EKS
```

## Repository Structure

```text
application/        Node.js CloudLab API
infrastructure/     Terraform infrastructure code
kubernetes/         Base Kubernetes manifests
gitops/             Argo CD / environment configuration
docs/               Architecture and learning documentation
.gitlab-ci.yml       GitLab CI/CD pipeline (added progressively)
```

## Learning Roadmap

1. Build and understand the Node.js application locally.
2. Containerize the application with Docker.
3. Build the AWS network with Terraform.
4. Provision EKS and managed worker nodes with Terraform.
5. Configure IAM and EKS access.
6. Deploy the application manually with kubectl.
7. Push application images to Amazon ECR.
8. Build the application pipeline in GitLab CI.
9. Introduce Argo CD and GitOps deployment.
10. Build the Terraform GitLab pipeline using AWS OIDC.
11. Add per-user lab namespaces, quotas, and policies.
12. Add observability, autoscaling, security, and cost controls.

## Current Phase

**Phase 1: Node.js application foundation**

At this stage no AWS infrastructure is required. The purpose is to understand the application that will eventually run inside EKS before introducing Kubernetes and Terraform.

## Principles

- Infrastructure is created through Terraform, not manually through the AWS console unless explicitly documented as a bootstrap step.
- Application CI and infrastructure CI are separate concerns.
- GitOps becomes the deployment mechanism after the manual Kubernetes deployment is understood.
- AWS credentials must not be committed to this repository.
- Production-style concepts are introduced only after the simpler execution path is understood.
