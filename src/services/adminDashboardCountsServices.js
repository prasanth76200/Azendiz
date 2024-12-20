const dashboardsCounts = require( '../models/adminDashboardCounts');

const dashboardsCompanyCounts = async () =>{
try {
    const companyCounts = await dashboardsCounts.totalCompanies();
    return companyCounts
} catch (error) {
    console.log(error)
}

}
const dashboardsProductCounts = async () =>{
try {
    const productCounts = await dashboardsCounts.totalProdcuts();
    return productCounts
} catch (error) {
    console.log(error)
}

}
const dashboardsBrandCounts = async () =>{
try {
    const BrandsCounts = await dashboardsCounts.totalBrands();
    return BrandsCounts
} catch (error) {
    console.log(error)
}

}
const dashboardsCatagoriesCounts = async () =>{
try {
    const catagoriesCounts = await dashboardsCounts.totalCatagory();
    return catagoriesCounts
} catch (error) {
    console.log(error)
}

}

module.exports={
    dashboardsCompanyCounts,
    dashboardsProductCounts,
    dashboardsBrandCounts,
    dashboardsCatagoriesCounts

}