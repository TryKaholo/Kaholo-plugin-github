const parsers = require("./parsers");
const { listOrgs, getAuthenticatedUser, listRepos, listBranches, listCommits, listPullRequests } = require("./github.service");

// auto complete helper methods

const MAX_RESULTS = 10;

function mapAutoParams(autoParams){
  const params = {};
  autoParams.forEach(param => {
    params[param.name] = parsers.autocomplete(param.value);
  });
  return params;
}

/***
 * @returns {[{id, value}]} filtered result items
 ***/
function handleResult(result, query, parseFunc){
  if (!parseFunc) {
    parseFunc = (item) => getAutoResult(`${item.full_name || item.login || item.id || ""}`, item.name || item.title);
  }
  const items = result.map(parseFunc);
  return filterItems(items, query);
}

function getAutoResult(id, value) {
  return {
    id: id || value,
    value: value || id
  };
}

function getParseFromParam(paramName) {
  return (item) => getAutoResult(item[paramName]);
}

function filterItems(items, query){
  if (query){
    const qWords = query.split(/[. ]/g).map(word => word.toLowerCase()); // split by '.' or ' ' and make lower case
    items = items.filter(item => qWords.every(word => item.value.toLowerCase().includes(word)));
    items = items.sort((word1, word2) => word1.value.toLowerCase().indexOf(qWords[0]) - word2.value.toLowerCase().indexOf(qWords[0]));
  }
  return items.splice(0, MAX_RESULTS);
}

function returnUnique(items) {
  const ids = new Set();
  return items.reduce((prev, cur) => {
    if (!ids.has(cur.id)){
      prev.push(cur);
      ids.add(cur.id);
    }
    return prev;
  }, []);
}

// auto complete main methods
function listAuto(listFunc, parseFunc, compareFunc){
  return async (query, pluginSettings, triggerParameters) => {
    const settings = mapAutoParams(pluginSettings), params = mapAutoParams(triggerParameters); 
    let items = [];
    params.per_page = 50;
    while (items.length < MAX_RESULTS) {
      var result;
      try {
        result = await listFunc(params, settings);
      }
      catch (err) {
        throw `An error encountered while using the autocomplete function: ${err.message || JSON.stringify(err)}`;
      }
      if (result.length === 0) return items;
      items = returnUnique(items.concat(handleResult(result, query, parseFunc))); // add all items that matched with the query, parsed
      if (!query) return items;
      if (compareFunc || query.length >= Math.min(items.map(item => item.id.length))){ // if specified compareFunc or long enough query, check for exact match
        // if found exact match, return it.
        const exactMatch = items.find(compareFunc ? compareFunc(query) : (item => 
          item.value.toLowerCase().startsWith(query.toLowerCase()) || item.id.toLowerCase().startsWith(query.toLowerCase())));
        if (exactMatch) return [exactMatch];
      }
      if (result.length < 50) return items;
      params.page = (params.page || 0) + 1;
    }
    return items;
  }
}

async function listOwnersAuto(query, pluginSettings, triggerParameters){
  const settings = mapAutoParams(pluginSettings), params = mapAutoParams(triggerParameters); 
  try {
    const curUserLogin = (await getAuthenticatedUser(params, settings)).login;
    const owners = [getAutoResult("user", curUserLogin),
                    ...(await listOrgs(params, settings)).map(getParseFromParam("login"))];
    return filterItems(owners, query);
  }
  catch (err){
    throw `An error encountered while listing owners: ${err.message || JSON.stringify(err)}`;
  }
}

module.exports = {
  listOwnersAuto,
  listPRAuto: listAuto(listPullRequests, item => getAutoResult(new String(item.number), item.title)),
  listOrgsAuto: listAuto(listOrgs),
  listReposAuto: listAuto(listRepos),
  listBranchesAuto: listAuto(listBranches, getParseFromParam("name")),
  listCommitsAuto: listAuto(listCommits, (item) => getAutoResult(item.sha, 
    `${item.commit.message.replace(/[\n!@#$%^&*()+=;]/g, " ")} [${item.sha.substring(0, 7)}]`),
    query => query && query.length > 6 ? (item) => item.id.toLowerCase().startsWith(query.toLowerCase()) : () => false)
}