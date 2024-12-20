const adminDashbordsService  = require('../services/adminDashboardCountsServices');


const showCompanyCounts = async (req, res)=>{

  
        try {
            const companiesCounts = await adminDashbordsService.dashboardsCompanyCounts();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ companiesCounts }));
            
        } catch (error) {
            console.error('Error in getAllCompanies:', error);
            res.status(500).json({ error: 'Failed to fetch companies' });
        }

}
const showProductsCount = async (req, res)=>{

  
        try {
            const productsCounts = await adminDashbordsService.dashboardsProductCounts();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ productsCounts }));
            
        } catch (error) {
            console.error('Error in getAllCompanies:', error);
            res.status(500).json({ error: 'Failed to fetch companies' });
        }

}
const showCatagoriesCounts = async (req, res)=>{

  
        try {
            const catagoriesCounts = await adminDashbordsService.dashboardsCatagoriesCounts();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ catagoriesCounts }));
            
        } catch (error) {
            console.error('Error in getAllCompanies:', error);
            res.status(500).json({ error: 'Failed to fetch companies' });
        }

}
const showBrandCounts = async (req, res)=>{

  
        try {
            const brandCounts = await adminDashbordsService.dashboardsBrandCounts();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ brandCounts }));
            
        } catch (error) {
            console.error('Error in getAllCompanies:', error);
            res.status(500).json({ error: 'Failed to fetch companies' });
        }

}

module.exports={
    showCompanyCounts,
    showProductsCount,
    showCatagoriesCounts,
    showBrandCounts

}