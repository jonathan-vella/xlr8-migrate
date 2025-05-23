---
layout: default
title: Azure VM Baseline Landing Zone
nav_order: 20
parent: Root
---

# 🏗️ Azure Virtual Machines Baseline Landing Zone

A reference architecture and best practices for deploying Azure Virtual Machines in a secure, well-governed landing zone, aligned with Microsoft's Cloud Adoption Framework (CAF) and Well-Architected Framework (WAF).

---

## 📖 Overview

The [Azure Virtual Machines Baseline Landing Zone](https://learn.microsoft.com/en-us/azure/architecture/virtual-machines/baseline-landing-zone) provides a comprehensive blueprint for organizations migrating VM-based workloads to Azure. It defines:

- **Architecture patterns** for scalable, secure, and compliant VM deployments
- **Separation of responsibilities** between platform and workload teams
- **Networking, security, monitoring, and governance** best practices
- **Guidance for subscription setup, policy, and change management**

## 🗺️ Architecture Summary

- **Hub-and-spoke network topology** with centralized services (firewall, Bastion, DNS, monitoring)
- **Workload team** manages application VMs, subnets, and secrets
- **Platform team** manages shared resources, policies, and connectivity
- **Strong focus on security, cost optimization, and operational excellence**

## 🖼️ Architecture Diagram

![VM Baseline Landing Zone Architecture](https://learn.microsoft.com/en-us/azure/architecture/virtual-machines/media/baseline-landing-zone.svg)

> _For a detailed, interactive diagram, see the [original article](https://learn.microsoft.com/en-us/azure/architecture/virtual-machines/baseline-landing-zone)._ 

## 🔑 Key Components

- **Azure Virtual Machines** (across availability zones)
- **Azure Load Balancer** and **Application Gateway** (with WAF)
- **Azure Key Vault** for secrets/certificates
- **Azure Monitor, Log Analytics, Application Insights**
- **Azure Firewall, Bastion, and Policy**
- **Private endpoints, NSGs, UDRs, and private DNS zones**

## 👥 Team Responsibilities

| Workload Team | Platform Team |
|---------------|--------------|
| VM resources, subnets, secrets, monitoring | Shared services, policies, network, governance |

## 📝 Best Practices

- Communicate requirements between teams early
- Use centralized services for security and cost efficiency
- Apply and test policies proactively
- Monitor and manage changes collaboratively

## 🚀 Reference Implementation

- [MS Learn: Azure VM Baseline Landing Zone](https://learn.microsoft.com/en-us/azure/architecture/virtual-machines/baseline-landing-zone)
- [GitHub: iaas-landing-zone-baseline Reference Implementation](https://github.com/mspnp/iaas-landing-zone-baseline)

## 📚 Further Reading

- [Azure Landing Zones (CAF)](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone)
- [Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)

---

_This summary is provided for quick reference. For full details, always consult the official Microsoft documentation._
