const baseUri = "https://airapizealand.azurewebsites.net/api/Air"

//"http://localhost:5010/api/AirDatas"


Vue.createApp({
    data() {
        return {
            AirDatas: [],
            NewestRoomDatas: [],
            AllRooms: new Set([]),
            error: null,
            NewestRoomSet: false
        }
    },
    async mounted() {
        console.log("mounted method called")
        this.helperGetAir(baseUri)
        
    },
    methods: {
        async helperGetAir(uri) {
            try {
                const response = await axios.get(uri)
                this.AirDatas = await response.data
                this.error = null
                await this.getAllRooms()
                this.filterRoomData()
            } catch (ex) {
                this.AirDatas = []
                this.error = ex.message
            }
        },
        async filterRoomData(){
            console.log("Called filterRoomData")
            AllRoomsArray = [...this.AllRooms]
            //Goes through every room 
            for(let i = 0, len = this.AllRooms.size; i < len; i++){   
                idCounter = 0;
                RoomDataAray = []

                for (const AirData of this.AirDatas) {
                    if (AirData.roomId == AllRoomsArray[i] &&  AirData.id > idCounter){
                        RoomDataAray.push(AirData)
                        idCounter = AirData.id
                    }
                }
                this.NewestRoomDatas.push(RoomDataAray.pop())
            }
        this.NewestRoomSet = true
        },
        async getAllRooms(){
            console.log("Called getAllRooms")
            for (const AirData of this.AirDatas) {
                this.AllRooms.add(AirData.roomId)
            }
        }

    }
}).mount("#app")