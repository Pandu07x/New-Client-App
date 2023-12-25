const dashboardModel = require('../models/dashboard.model');


const getMainDashboardData = async (req, res) => {
    try {
      const dashData = await dashboardModel.getMainDashboardData(); 
  
      if (dashData) {
        res.json({ success: true, message: 'MasterPanel data retrieved successfully', dashData });
      } else {
        res.json({ success: false, message: 'No table data found' });
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  const getPlcStatusData = async (req, res) => {
    try {
      const dashData = await dashboardModel.getPlcStatusData(); 
  
      if (dashData) {
        res.json({ success: true, message: 'MasterPanel data retrieved successfully', dashData });
      } else {
        res.json({ success: false, message: 'No table data found' });
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  //Get Test BenchRunning IDle Count
  const getTestBenchStatusCount=async(req,res)=>{
    try{
      const dashdata= await dashboardModel.TestBenchRunningIdle();
      
      if(dashdata){
        res.send({"success":true,"Running":dashdata.rows[0].running,"Available":dashdata.rows[0].idel })
      }
      else{
        res.send({success:"false",message:"data not found"})
      }
    }catch(err){
      res.send("Error Occuted",err)
    }
  }
  //Get Last 5 Test Bench Data
  const Last5BechData=async(req,res)=>{
    try{
      const data=await dashboardModel.Last5Bench()
      if(data){
        res.send({sucess:true,data:data})
      }
      else{
        res.send({sucess:false,message:"Not Found"})
      }


    }
    catch(err){
      res.send("Error Occured",err)
    }
  }
  //Get Test Object Count
  const GetTestObjectCount=async(req,res)=>{
    try{
      var data=await dashboardModel.TestObjectCount()
      
      var data2={
        "totalWeeklyObjCount":data[0].Week,
        "totalMonthlyObjCount":data[0].Month,
        "totalYearlyObjCount":data[0].Year
      }
      
    if(data){
      res.send(data2)
    }
    else{
      res.status(404).send("Data Not Found")
    }
    }
    catch(err){
      res.send("Error Occured",err)
    }
  }
  const TestbenchDetails=async(req,res)=>{
    try{
      const data= await dashboardModel.TestbenchDetails()
      if(data){
        res.send(data)
        

      }
      else{
        res.send("data not Found")
      }

    }
    catch(err){
      res.send("error Occured",err)
    }
    

  }

  
  module.exports = { getMainDashboardData, getPlcStatusData,getTestBenchStatusCount,Last5BechData,GetTestObjectCount,TestbenchDetails };