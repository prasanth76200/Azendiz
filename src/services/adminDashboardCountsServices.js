const dashboardsCounts = require( '../models/adminDashboardCounts');



const dashboardsCompanyCounts = async () =>{
try {
    const companyCounts = await dashboardsCounts.totalCompanies();
    return companyCounts
} catch (error) {
    console.log(error)
}

}

module.exports={
    dashboardsCompanyCounts,

}