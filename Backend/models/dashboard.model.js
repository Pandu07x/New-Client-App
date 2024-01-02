const db = require('../database/db');

// Get Dashboard Data
const getMainDashboardData = async () => {
    try {
      const query = 'SELECT * FROM "MasterPanel" order By "DateTime" DESC limit 10;'
      const results = await db.query(query);
      
      return results
    } catch (err) {
      console.error(err);
      return err
    }
  };
  const getChartData = async (starttime,endtime) => {
    try {
      // console.log(starttime,endtime)
      const query = `SELECT * FROM "MasterPanel" where "DateTime">='${starttime}' and "DateTime"<='${endtime}' order by "DateTime" desc`
      const results = await db.query(query);
      return results.rows
    } catch (err) {
      console.error(err);
      return err
    }
  };

  // Get PLC Status Data
  const getPlcStatusData = async () => {
    try {
      const query = 'SELECT * FROM "PLCStatus" order by "PLCId" ';
      const results = await db.query(query);


      return results.rows
      
    } catch (err) {
      console.error(err);
      return err
    }
  };

  //Get TestBench Running Idle Count
  const TestBenchRunningIdle=async()=>{
    try{
      const query=`SELECT count(*) as running,(select count(*) from "TestBenchCurrentStatus")-count(*) as idel  FROM "TestBenchCurrentStatus" where "Status" = 'Running';`
      const result= await db.query(query);
      return result

    }
    catch(err){
      return "error"

    }
  }
  //Get Last 5 Bench Data In Main DashBoard
  const Last5Bench=async()=>{
    try{
      const query=`select PM."ProjectName",concat('Test Bench',' ',PM."TestBenchNo") as "TestBench" ,TRS."StartDateTime" from "TestRunData" TRS
    inner join "ProjectMaster" PM on PM."ProjectId" = TRS."ProjectId" order by TRS."StartDateTime" desc limit 5`
    const result=await db.query(query)
    return result.rows
    }catch(err){
      return err
    }
  }
  //Get Test object Count for (Week,Month,Year)
  const TestObjectCount=async()=>{
    try{
      const query=`SELECT (select count(*) as "Week"  from "TestRunData" where date_part('week', "StartDateTime") = date_part('week', CURRENT_DATE) and 
    date_part('year', "StartDateTime") =  date_part('year', CURRENT_DATE)), (select count(*) as "Month" FROM "TestRunData" 
    where date_part('month', "StartDateTime") =  date_part('month', CURRENT_DATE) and 
    date_part('year', "StartDateTime") =  date_part('year', CURRENT_DATE)),
    (select count(*) as "Year" FROM "TestRunData" 
    where date_part('year', "StartDateTime") =  date_part('year', CURRENT_DATE));`
    const result=await db.query(query)
    return result.rows

    }catch(err){
      return (err,"err")
    }
  }

  // Get Test Bench Details
  const TestbenchDetails=async()=>{
    const query=`select tbr."Status",pm."ProjectName",pm."ProjectNo",pm."ProjectType",pm."ProjectId",tbr."TestRunCount",pm."ProjectOwner",tbr."TestBenchId" from "TestBenchCurrentStatus" tbr
    join "ProjectMaster" pm on tbr."ProjectId"=pm."ProjectId" order by tbr."TestBenchId"`
    const result= await db.query(query)
    return result.rows
  }
  // Get Project Details by Id
  const getProjectDetials=async(projectid)=>{
    const query=`select tbr."Status",pm."ProjectName",pm."ProjectNo",pm."ProjectType",pm."ProjectId",tbr."TestRunCount",pm."ProjectOwner",tbr."TestBenchId" from "TestBenchCurrentStatus" tbr
    join "ProjectMaster" pm on tbr."ProjectId"=pm."ProjectId" Where tbr."TestBenchId"=${projectid}`
    const result= await db.query(query)
    return result.rows

  }
  //Get TestBenchDetails Status and Time in Hours by project Id
  const getTestBenchDetails=async(projectid)=>{
    const query=`SELECT "Status","DateTime"
    FROM "TestBenchCurrentStatus" where "ProjectId"=${projectid}`
    const result=await db.query(query)
    const date=new Date()

    const datatime=result.rows[0].DateTime
    const difference=Math.abs(date-datatime)/1000
    const hours=Math.floor(difference/3600)
    const min=Math.floor((difference%3600)/60)
    const sec=Math.floor(difference%60)
    console.log()
    const data={
      "Status":result.rows[0].Status,
      "Time":`${hours}:${min}:${sec}`
    }
    return data
    
  }

  //Get Time Series Data By Project Id
  const getTimeSeriesData=async(projectid)=>{
    return "Hello World"


  }

  module.exports = { 
    getMainDashboardData , getPlcStatusData,TestBenchRunningIdle,Last5Bench,TestObjectCount,TestbenchDetails,getProjectDetials,getTestBenchDetails,getChartData
  };
  