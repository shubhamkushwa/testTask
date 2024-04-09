export const heavyComputation = (data) => {
    const startTime = Date.now(); 
    let result = '';
    for (let i = 0; i < 10000; i++) {
        result += Math.round(Math.random());
    }
    const endTime = new Date().getTime(); 
    const timeTaken = endTime - startTime;
    console.log("Function took " + timeTaken + " milliseconds");
    return `This result is computed heavily with userId:- ${data.userId}`;
};