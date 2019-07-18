// /* 组织 */
// // board
// const LOGIN = "wzvtcsoft-specialstudent"; // organization{login: xxx}

// /* 项目名称 */
// // board
// const NAME = "ScrumDemo"; // repository{name: xxx}

// /* 项目ID */
// //StoryList
// const XIANGMU_ID = "MDEwOlJlcG9zaXRvcnkxOTYxNjI3MTg="; //  respository{id: xxx}
// /* 
//    去github GraphQL API 查询
//    Dmsbog: MDEwOlJlcG9zaXRvcnkxOTYxNTIyMTE=
//    ScrumDemo: MDEwOlJlcG9zaXRvcnkxODcxMTgwMTM=
//    Single-police-cabinet: MDEwOlJlcG9zaXRvcnkxOTYxNjI3MTg=
// */


// /* 组织创建者的ID*/
// // addDialog
// const XIANGMU_OWNERID = "MDEyOk9yZ2FuaXphdGlvbjQ5MzA1ODk0"; // 去github GraphQL API 查询

const  LOGIN=localStorage.getItem('LOGIN')
const  NAME=localStorage.getItem('NAME')
const  XIANGMU_ID=localStorage.getItem('XIANGMU_ID')
const  XIANGMU_OWNERID=localStorage.getItem('XIANGMU_OWNERID')
// const  access_token=JSON.parse(localStorage.getItem('access_token'))


 export { LOGIN, NAME, XIANGMU_ID, XIANGMU_OWNERID}