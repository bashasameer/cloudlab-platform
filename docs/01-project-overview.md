# 01 - Project Overview

## What are we building?

CloudLab is a small Internal Developer Platform. Users will eventually be able to request temporary DevOps/Kubernetes lab environments without needing direct administrative access to the EKS cluster.

## Why start with Node.js?

The application is the product users interact with. AWS, EKS, Terraform, GitLab, and Argo CD are supporting infrastructure. Understanding this separation prevents the common mistake of treating "an EKS cluster" as the application.

## Phase 1 request flow

```text
Browser/curl
    |
    | HTTP
    v
Node.js process
    |
    v
Express router
    |
    +-- GET /
    +-- GET /health
    +-- GET /api/v1/labs
```

There is no Kubernetes or AWS in this path yet.

## Future request flow

```text
User
  |
  v
AWS Load Balancer
  |
  v
Kubernetes Service
  |
  v
CloudLab Node.js Pod
  |
  v
Kubernetes API
  |
  +-- Create namespace
  +-- Apply ResourceQuota
  +-- Create ServiceAccount
  +-- Create lab workload
```

## Future infrastructure flow

```text
Engineer -> GitLab -> Terraform pipeline -> AWS
                                      |
                                      +-- VPC
                                      +-- ECR
                                      +-- IAM
                                      +-- EKS
                                      +-- managed node groups
```

## Future application delivery flow

```text
Developer -> GitLab -> npm test -> Docker build -> ECR
                                                   |
                                                   v
                                              GitOps config
                                                   |
                                                   v
                                                Argo CD
                                                   |
                                                   v
                                                  EKS
```

## Important distinction

Three different processes exist:

1. **Provisioning** - Terraform creates infrastructure.
2. **CI** - GitLab validates/tests/builds artifacts.
3. **Deployment/GitOps** - Argo CD reconciles Kubernetes with Git.

Do not combine these concepts mentally. They interact, but they solve different problems.
