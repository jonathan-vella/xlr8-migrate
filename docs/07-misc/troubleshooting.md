---
layout: default
title: Troubleshooting
nav_order: 4
parent: Miscellaneous Resources
---

# Troubleshooting Common Migration Issues

This comprehensive troubleshooting guide addresses common issues encountered during Azure migration projects and provides step-by-step resolution procedures.

## 🌐 Network Connectivity Issues

### Unable to Connect to Azure Resources After Migration

**Symptoms:**
- Applications cannot reach Azure services
- Remote desktop/SSH connections fail
- Database connections timeout
- API calls return network errors

**Diagnostic Steps:**
1. **Check Network Security Groups (NSGs)**
   ```powershell
   # List NSG rules for a specific VM
   Get-AzNetworkSecurityGroup -ResourceGroupName "MyRG" | Get-AzNetworkSecurityRuleConfig
   ```

2. **Verify Azure Firewall Rules**
   - Review firewall policies and rules
   - Check application and network rule collections
   - Validate destination IP ranges and ports

3. **Test DNS Resolution**
   ```powershell
   # Test DNS resolution
   nslookup myapp.azurewebsites.net
   Resolve-DnsName myapp.azurewebsites.net
   ```

**Solutions:**
- **NSG Configuration**: Add required inbound/outbound rules for application ports
- **DNS Settings**: Update DNS servers to Azure-provided DNS or custom DNS
- **Route Tables**: Verify user-defined routes don't conflict with system routes
- **Service Endpoints**: Configure VNet service endpoints for Azure services
- **Private Endpoints**: Implement private endpoints for secure connectivity

### ExpressRoute/VPN Connectivity Problems

**Symptoms:**
- Intermittent connectivity between on-premises and Azure
- High latency or packet loss
- BGP routing issues

**Diagnostic Steps:**
1. **Check Connection Status**
   ```powershell
   # Check VPN Gateway connections
   Get-AzVirtualNetworkGatewayConnection -ResourceGroupName "MyRG"
   ```

2. **Review BGP Information**
   ```powershell
   # Get BGP peer status
   Get-AzVirtualNetworkGatewayBGPPeerStatus -ResourceGroupName "MyRG" -VirtualNetworkGatewayName "MyVPNGW"
   ```

**Solutions:**
- **BGP Configuration**: Verify BGP peering and route advertisement
- **Bandwidth Monitoring**: Check for bandwidth exhaustion
- **Redundancy**: Implement multiple connections for high availability
- **Route Optimization**: Review and optimize routing policies

---

## ⚡ Performance Issues

### Application Performance Degradation

**Symptoms:**
- Slow response times
- High CPU or memory utilization
- Database query timeouts
- User complaints about application speed

**Diagnostic Steps:**
1. **Monitor Resource Utilization**
   ```powershell
   # Get VM performance metrics
   Get-AzMetric -ResourceId "/subscriptions/.../resourceGroups/MyRG/providers/Microsoft.Compute/virtualMachines/MyVM" -MetricName "Percentage CPU" -TimeGrain 00:05:00
   ```

2. **Check Storage Performance**
   - Review IOPS and throughput metrics
   - Monitor storage latency
   - Check for storage throttling

3. **Network Performance Analysis**
   - Monitor network in/out metrics
   - Check for network throttling
   - Analyze inter-service communication patterns

**Solutions:**
- **VM Right-Sizing**: Upgrade to appropriate VM SKUs based on workload requirements
- **Storage Optimization**: 
  - Migrate to Premium SSD or Ultra Disk for high-performance workloads
  - Implement disk caching strategies
  - Consider Azure NetApp Files for enterprise workloads
- **Network Optimization**:
  - Use accelerated networking for supported VM sizes
  - Implement proximity placement groups for low latency
  - Consider ExpressRoute for consistent performance

### Database Performance Issues

**Symptoms:**
- Query execution timeouts
- High DTU/vCore utilization
- Connection pool exhaustion
- Blocking and deadlocks

**Diagnostic Steps:**
1. **Monitor Database Metrics**
   ```sql
   -- Check active sessions and blocking
   SELECT * FROM sys.dm_exec_sessions WHERE status = 'running'
   SELECT * FROM sys.dm_exec_requests WHERE blocking_session_id > 0
   ```

2. **Analyze Query Performance**
   - Use Query Store for performance insights
   - Review execution plans for inefficient queries
   - Monitor wait statistics

**Solutions:**
- **Service Tier Scaling**: Upgrade to higher service tiers or compute sizes
- **Index Optimization**: Create missing indexes and remove unused ones
- **Query Optimization**: Rewrite inefficient queries and update statistics
- **Connection Management**: Implement connection pooling and retry logic
- **Read Replicas**: Offload read workloads to read replicas

---

## 🔐 Authentication and Authorization Issues

### Azure AD Integration Problems

**Symptoms:**
- Users cannot authenticate to migrated applications
- SSO not working properly
- Permission errors when accessing resources
- Application registration issues

**Diagnostic Steps:**
1. **Check Azure AD Connect Health**
   ```powershell
   # Verify AD Connect sync status
   Get-ADSyncConnectorRunStatus
   ```

2. **Review Application Registrations**
   - Verify redirect URIs and API permissions
   - Check certificate expiration dates
   - Validate client secrets

3. **Monitor Sign-in Logs**
   - Review Azure AD sign-in logs for failures
   - Check conditional access policy impacts
   - Analyze risk detections

**Solutions:**
- **Sync Configuration**: Fix Azure AD Connect synchronization issues
- **Application Configuration**: Update application settings for cloud authentication
- **Permission Grants**: Ensure proper API permissions and admin consent
- **Certificate Management**: Renew expired certificates and update applications
- **Conditional Access**: Review and adjust conditional access policies

### Service Principal and Managed Identity Issues

**Symptoms:**
- Applications cannot access Azure resources
- Key Vault access denied errors
- Storage account authentication failures
- Service-to-service authentication problems

**Diagnostic Steps:**
1. **Verify Service Principal Configuration**
   ```powershell
   # Check service principal details
   Get-AzADServicePrincipal -DisplayName "MyApp"
   ```

2. **Review Role Assignments**
   ```powershell
   # List role assignments for a principal
   Get-AzRoleAssignment -ObjectId "service-principal-object-id"
   ```

**Solutions:**
- **Role Assignment**: Assign appropriate RBAC roles to service principals
- **Managed Identity**: Enable and configure system or user-assigned managed identities
- **Key Vault Policies**: Update access policies for service principals
- **Secret Management**: Rotate secrets and update application configurations

---

## 💾 Data Migration and Integrity Issues

### Data Loss or Corruption

**Symptoms:**
- Missing records after migration
- Data type conversion errors
- Encoding issues with special characters
- Referential integrity violations

**Diagnostic Steps:**
1. **Data Validation Queries**
   ```sql
   -- Compare record counts
   SELECT COUNT(*) FROM SourceTable
   SELECT COUNT(*) FROM TargetTable
   
   -- Check for data type issues
   SELECT * FROM TargetTable WHERE ColumnName IS NULL AND SourceColumnName IS NOT NULL
   ```

2. **Check Migration Logs**
   - Review Azure Database Migration Service logs
   - Check for warnings and errors during migration
   - Validate data type mappings

**Solutions:**
- **Re-run Migration**: Use incremental migration to catch missing data
- **Data Type Mapping**: Review and correct data type conversions
- **Character Encoding**: Ensure proper UTF-8 encoding for international characters
- **Constraint Validation**: Temporarily disable constraints during migration, then re-enable
- **Backup Restoration**: Restore from verified backups if corruption is detected

### Database Connection Issues

**Symptoms:**
- Connection timeout errors
- SSL/TLS certificate errors
- Authentication failures
- Connection pool exhaustion

**Diagnostic Steps:**
1. **Test Connectivity**
   ```powershell
   # Test SQL connection
   Test-NetConnection -ComputerName "myserver.database.windows.net" -Port 1433
   ```

2. **Review Connection Strings**
   - Validate server names and database names
   - Check authentication methods (SQL vs Azure AD)
   - Verify encryption settings

**Solutions:**
- **Firewall Rules**: Configure server-level and database-level firewall rules
- **Connection String Updates**: Update applications with new Azure SQL connection strings
- **SSL Configuration**: Enable SSL/TLS and update certificate trust
- **Connection Pooling**: Implement proper connection pooling strategies
- **Retry Logic**: Add exponential backoff retry logic for transient failures

---

## 💰 Cost Management Issues

### Unexpected Cost Overruns

**Symptoms:**
- Azure bills higher than expected
- Rapid consumption of Azure credits
- Cost alerts firing frequently
- Uncontrolled resource provisioning

**Diagnostic Steps:**
1. **Cost Analysis**
   ```powershell
   # Get cost and usage data
   Get-AzConsumptionUsageDetail -StartDate (Get-Date).AddDays(-30) -EndDate (Get-Date)
   ```

2. **Resource Inventory**
   - Identify largest cost contributors
   - Review resource utilization metrics
   - Check for orphaned or unused resources

**Solutions:**
- **Budget Implementation**: Set up budgets with automated alerts
- **Resource Tagging**: Implement comprehensive tagging for cost allocation
- **Rightsizing**: Use Azure Advisor recommendations for VM rightsizing
- **Reserved Instances**: Purchase reserved capacity for predictable workloads
- **Automation**: Implement auto-shutdown for dev/test environments
- **Governance**: Use Azure Policy to prevent oversized resource deployment

### Data Transfer Cost Issues

**Symptoms:**
- High bandwidth charges
- Unexpected egress costs
- Cross-region data transfer fees

**Solutions:**
- **Traffic Analysis**: Monitor data flows between regions and services
- **CDN Implementation**: Use Azure CDN to reduce egress costs
- **Region Optimization**: Collocate services in the same region where possible
- **Compression**: Enable compression for web applications and APIs
- **Caching**: Implement caching strategies to reduce data transfer

---

## 🚀 Migration Tool Issues

### Azure Migrate Problems

**Symptoms:**
- Discovery agent not reporting data
- Assessment errors or incomplete data
- Replication failures during migration
- Performance impact on source systems

**Diagnostic Steps:**
1. **Check Agent Status**
   ```powershell
   # Verify migration service connectivity
   Test-NetConnection -ComputerName "*.migrate.azure.com" -Port 443
   ```

2. **Review Assessment Reports**
   - Check for unsupported configurations
   - Review readiness status for each VM
   - Validate licensing recommendations

**Solutions:**
- **Agent Updates**: Ensure latest versions of migration agents
- **Network Configuration**: Open required ports and URLs for migration services
- **Permission Issues**: Verify service accounts have proper permissions
- **Resource Limits**: Check for throttling due to concurrent migrations
- **Source System Health**: Ensure source systems are healthy before migration

### Azure Site Recovery Issues

**Symptoms:**
- Replication not starting or failing
- High recovery point objective (RPO)
- Test failover failures
- Protection status warnings

**Diagnostic Steps:**
1. **Check Replication Health**
   ```powershell
   # Get ASR replication status
   Get-AzRecoveryServicesAsrReplicationProtectedItem -ProtectionContainer $Container
   ```

2. **Review Infrastructure**
   - Verify mobility service installation
   - Check process server capacity
   - Validate network bandwidth

**Solutions:**
- **Mobility Service**: Update or reinstall mobility service on VMs
- **Process Server Scaling**: Add additional process servers for large environments
- **Network Optimization**: Increase bandwidth or implement traffic prioritization
- **Disk Exclusion**: Exclude non-critical disks from replication
- **Retention Policy**: Adjust retention policies based on requirements

---

## 🔧 Post-Migration Issues

### Application Functionality Problems

**Symptoms:**
- Features not working as expected
- Integration points failing
- Configuration errors
- Service dependencies broken

**Diagnostic Steps:**
1. **Application Logs Review**
   ```powershell
   # Check Windows Event Logs
   Get-EventLog -LogName Application -Newest 100 | Where-Object {$_.EntryType -eq "Error"}
   ```

2. **Service Dependencies**
   - Map all external service dependencies
   - Test API connectivity and authentication
   - Verify configuration file settings

**Solutions:**
- **Configuration Updates**: Update connection strings and service endpoints
- **Environment Variables**: Set appropriate environment variables for Azure
- **Service Principal Configuration**: Configure managed identities for Azure services
- **Load Balancer Configuration**: Update health probes and backend pools
- **DNS Updates**: Point DNS records to new Azure endpoints

### Monitoring and Alerting Gaps

**Symptoms:**
- No visibility into application performance
- Missing alerts for critical issues
- Inadequate logging
- No operational dashboards

**Solutions:**
- **Azure Monitor Setup**: Implement comprehensive monitoring across all resources
- **Application Insights**: Add application performance monitoring
- **Log Analytics**: Centralize logging with structured log collection
- **Alert Rules**: Create proactive alerts for key metrics and thresholds
- **Dashboards**: Build operational dashboards for different stakeholder groups

---

## 🆘 Emergency Procedures

### Rollback Procedures

**When to Execute Rollback:**
- Critical functionality failures that cannot be quickly resolved
- Unacceptable performance degradation
- Data integrity issues
- Security vulnerabilities introduced

**Rollback Steps:**
1. **Immediate Actions**
   - Stop new user traffic to Azure environment
   - Redirect traffic back to on-premises systems
   - Communicate status to stakeholders

2. **Data Synchronization**
   - Assess data changes since migration
   - Implement data sync from Azure back to on-premises
   - Verify data integrity after rollback

3. **Service Restoration**
   - Restart on-premises services if needed
   - Update DNS records to point to original systems
   - Verify all integrations are working

### Escalation Procedures

**Level 1 - Internal Team**
- Review documentation and knowledge base
- Check with team members for similar issues
- Attempt basic troubleshooting steps

**Level 2 - Microsoft Support**
- Open Azure support ticket with appropriate severity
- Provide detailed symptoms and troubleshooting steps taken
- Include relevant logs and screenshots

**Level 3 - Emergency Response**
- Engage Microsoft FastTrack or Premier Support
- Consider emergency change procedures
- Implement business continuity plans

---

## 📋 Prevention and Best Practices

### Pre-Migration Validation
- **Comprehensive Testing**: Test all migration procedures in non-production environments
- **Dependency Mapping**: Document all application dependencies and integration points
- **Performance Baselines**: Establish performance benchmarks before migration
- **Rollback Planning**: Develop and test detailed rollback procedures

### Monitoring and Alerting
- **Proactive Monitoring**: Implement monitoring before issues occur
- **Alert Tuning**: Configure alerts with appropriate thresholds to avoid noise
- **Dashboard Creation**: Build dashboards for different operational teams
- **Log Retention**: Implement appropriate log retention policies

### Documentation and Knowledge Transfer
- **Runbook Development**: Create detailed operational runbooks
- **Knowledge Base**: Document solutions to common issues
- **Team Training**: Ensure team members understand new Azure operations
- **Change Management**: Implement proper change control processes

---

## 📞 Additional Resources

- **Azure Support**: [Azure Support Plans](https://azure.microsoft.com/support/plans/)
- **Documentation**: [Azure Migration Documentation](https://docs.microsoft.com/azure/migrate/)
- **Community**: [Azure Migration Forum](https://docs.microsoft.com/answers/topics/azure-migrate.html)
- **Training**: [Microsoft Learn - Azure Migration](https://docs.microsoft.com/learn/paths/migrate-modernize-applications-azure/)

For complex issues, consider engaging:
- Microsoft FastTrack for Azure
- Microsoft Premier Support
- Certified Azure Migration Partners

---

*Last updated: {{ "now" | date: "%B %Y" }}*
