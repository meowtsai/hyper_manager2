// 取得原廠提供的連結
// 比對資料庫中的紀錄
// 新增缺少的伺服器

const axios =  require("axios")
const ServersModel = require("../../models/ServersModel")
const game_id = "g102naxx2tw"
const g102serverlist = require('../../config/service')['g102serverlist'];
async function getServerList() {

    try {
        const {data} = await axios.get(g102serverlist)
        return data 
    } catch (error) {
        throw new Error("取得伺服器列表失敗")
    }
    
}


const main=async() =>{
    const result = await getServerList()
    if (result.serverlists) {
        const existedServers = await ServersModel.getByGameId(game_id)
        const sKeys = Object.keys(result.serverlists)
        sKeys.forEach(sKey => {
            const s = result.serverlists[sKey]
            
            if (existedServers.filter(es=> es.address=== s.servername).length === 0) {
                
                const newServer = {
                    game_id,
                    server_id: `G102_${sKey}-${s.servername}`,
                    name:s.servername,
                    server_status:'public',
                    address:s.servername
                }
                console.log("newServer", newServer);
                ServersModel.save(newServer).then(res => console.log(res))
            }
        })
     
     
        
    }

}

main()

setTimeout(function() {
    process.exit();
  }, 20000);