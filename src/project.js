var LOGIN=""
var NAME=""
var XIANGMU_ID=""
var XIANGMU_OWNERID=""

   LOGIN=localStorage.getItem('LOGIN')
    NAME=localStorage.getItem('NAME')
    XIANGMU_ID=localStorage.getItem('XIANGMU_ID')
     XIANGMU_OWNERID=localStorage.getItem('XIANGMU_OWNERID')

// else {
// /* 组织 */
// // board
// LOGIN = "wzvtcsoft-specialstudent"; // organization{login: xxx}

// /* 项目名称 */
// // board
// NAME = "ScrumDemo"; // repository{name: xxx}

// /* 项目ID */
// //StoryList
// XIANGMU_ID = "MDEwOlJlcG9zaXRvcnkxOTYxNjI3MTg="; //  respository{id: xxx}
// /* 
//    去github GraphQL API 查询
//    Dmsbog: MDEwOlJlcG9zaXRvcnkxOTYxNTIyMTE=
//    ScrumDemo: MDEwOlJlcG9zaXRvcnkxODcxMTgwMTM=
//    Single-police-cabinet: MDEwOlJlcG9zaXRvcnkxOTYxNjI3MTg=
// */


// /* 组织创建者的ID*/
// // addDialog
// XIANGMU_OWNERID = "MDEyOk9yZ2FuaXphdGlvbjQ5MzA1ODk0"; // 去github GraphQL API 查询


// // const  access_token=JSON.parse(localStorage.getItem('access_token'))

// }


 export { LOGIN, NAME, XIANGMU_ID, XIANGMU_OWNERID}