const dashboardModel = require('../models/dashboard.model');
const dat=require("../function/date")


const getMainDashboardData = async (req, res) => {
    try {
      const dashData = await dashboardModel.getMainDashboardData(); 
      
      
      
      if (dashData) {
        // dashData.rows[0].OilTank2Temp=13
        // dashData.rows[0].OilTank1Temp=15
        // dashData.rows[0].OilTank3Temp=75
        // dashData.rows[0].WaterTankTemp=50
        // dashData.rows[0].OilTank4Temp=80
        // dashData.rows[0].LabTemp=5
        // dashData.rows[0].MPEmergencyShutdownPB=true
        // dashData.rows[0].LabEmergency=true

        // console.log(dashData.rows)
       

        res.json({ success: true, message: 'MasterPanel data retrieved successfully', dashData });
      } else {
        res.json({ success: false, message: 'No table data found' });
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  const getChartData=async(req,res)=>{
    
    try{
      const starttime=req.body.params.starttime
    const endtime=req.body.params.endtime
    const start=dat.convertDate(starttime)
    const end=dat.convertDate(endtime)
    

    const data= await dashboardModel.getChartData(start,end)
    
    if(data){

      
      
      res.send(data)
    }
    else{
      res.send("NO Data")
    }
    }
    catch(err){
      res.send(err)
    }

    

  }
  
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
      res.send(err)
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
      res.send(err)
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
      res.send(err)
    }
  }
  //Get 7 Test Bench data
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
      res.send(err)
    }
  }
  // Get Project Details by id for 2 dashboard 
  const getProjectDetails=async(req,res)=>{
    const id=req.body.id
    //const id=req.session.name
    //const id=req.params.id
    console.log(id)
    
    try{
      const data=await dashboardModel.getProjectDetials(id)
      if(data){
        console.log(data,id)
        res.send(data)
      }
      else{
        console.log("error found")
        res.send("No data Found")
      }
    }
    catch(err){
      console.log(err)
      res.send(err)
    }
  }
  const test=async(req,res)=>{
    var body=req.body.id
    req.session.name=body
    console.log(req.session)
    res.send("Helloe rold") 
  }
  

  
  module.exports = { getMainDashboardData, getPlcStatusData,getTestBenchStatusCount,Last5BechData,GetTestObjectCount,TestbenchDetails,getProjectDetails,test,getChartData };