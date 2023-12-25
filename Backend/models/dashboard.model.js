const db = require('../database/db');

// Get Dashboard Data
const getMainDashboardData = async () => {
    try {
      const query = 'SELECT * FROM "MasterPanel" order By "DateTime" DESC limit 10';
      const results = await db.query(query);
      return results

    } catch (err) {
      console.error(err);
      res.status(500).send('failed');
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
      res.status(500).send('failed');
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

  const TestbenchDetails=async()=>{
    const query=`select tbr."Status",pm."ProjectName",pm."ProjectNo",pm."ProjectType",pm."ProjectId",tbr."TestRunCount" from "TestBenchCurrentStatus" tbr
    join "ProjectMaster" pm on tbr."ProjectId"=pm."ProjectId" order by tbr."TestBenchId"`
    const result= await db.query(query)
    return result.rows
  }

  

  module.exports = { 
    getMainDashboardData , getPlcStatusData,TestBenchRunningIdle,Last5Bench,TestObjectCount,TestbenchDetails
  };
  