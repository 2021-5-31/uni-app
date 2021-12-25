const requireApi = require.context('.',true,/.js$/)
let module = {};
requireApi.keys().forEach((item,index)=>{
	if(item === './index.js') return
	Object.assign(module,requireApi(item))
})
export default module