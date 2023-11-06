const headerWelcome = ()=>{
  const hours = new Date().getHours();
  if (hours>=3 && hours<12){
      return "Good morning";
  }
  else if(hours >=12 && hours < 16){
      return "Good afternoon";
  }
  return "Good evening";
}

export default headerWelcome;