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

module.exports={
    showCompanyCounts,
}