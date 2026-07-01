function extractDependencies(tokens){
    const deps=new Set();
    for(const token of tokens){
        if(token.type=="CELL"){
            deps.add(token.value)
        }
    }
    return Array.from(deps)
}

module.exports={extractDependencies}