const Client = require('kubernetes-client').Client
const axios = require('axios').default
const { KubeConfig } = require('kubernetes-client')
// const Request = require('kubernetes-client/backends/request')
// const kubeconfig = new KubeConfig()
// //kubeconfig.loadFromFile('/Users/globalsys.gabriell/.kube/config')
// const backend = new Request({ kubeconfig })
const client = new Client( {version: '1.13' })

client.loadSpec().then(res =>{
    console.log('k8s client running')
}).catch(err=> console.log(err))



exports.deploy = async (params) => { 
    
    const { deploymentyName, deploymentManifest, namespace, cluster } = params;
    
    kubeconfig.setCurrentContext(cluster || 'default')
    
    try {
        const create = await client.apis.apps.v1.namespaces(namespace || 'default').deployments(deploymentyName).post({ body: deploymentManifest })
        console.log('Create:', create)
      } catch (err) {
        if (err.code !== 409) throw err
        const replace = await client.apis.apps.v1.namespaces(namespace || 'default').deployments(deploymentyName).put({ body: deploymentManifest })
        console.log('Replace:', replace)
      }
}