function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(doSearch);

summaryInclude = 60;
var fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.2, // for parsing diacritics
  tokenize: true,
  matchAllTokens: true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [{
      name: "title",
      weight: 0.8
    },
    {
      name: "content",
      weight: 0.5
    },
    {
      name: "tags",
      weight: 0.3
    },
    {
      name: "categories",
      weight: 0.3
    }
  ]
};

function param(name) {
  return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

var searchQuery = param("s");

function doSearch() {
  if (searchQuery) {
    document.getElementById("search-query").value = searchQuery;
    executeSearch(searchQuery);
  } else {
    var para = document.createElement("P");
    para.innerText = "Please enter a word or phrase above";
    document.getElementById("search-results").appendChild(para);
  }
}

function getJSON(url, fn) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      fn(data);
    } else {
      console.log("Target reached on " + url + " with error " + request.status);
    }
  };
  request.onerror = function () {
    console.log("Connection error " + request.status);
  };
  request.send();
}

function executeSearch(searchQuery) {
  getJSON("/index.json", function (data) {
    var pages = data;
    var fuse = new Fuse(pages, fuseOptions);
    var result = fuse.search(searchQuery);
    if (result.length > 0) {
      populateResults(result);
    } else {
      var para = document.createElement("P");
      para.innerText = "No matches found";
      document.getElementById("search-results").appendChild(para);
    }
  });
}

function populateResults(result) {
  result.forEach(function (value, key) {
    var content = value.item.content;
    var snippet = "";
    var snippetHighlights = [];
    var tags = [];
    if (fuseOptions.tokenize) {
      snippetHighlights.push(searchQuery);
    } else {
      value.matches.forEach(function (mvalue, matchKey) {
        if (mvalue.key == "tags" || mvalue.key == "categories") {
          snippetHighlights.push(mvalue.value);
        } else if (mvalue.key == "content") {
          start = mvalue.indices[0][0] - summaryInclude > 0 ? mvalue.indices[0][0] - summaryInclude : 0;
          end = mvalue.indices[0][1] + summaryInclude < content.length ? mvalue.indices[0][1] + summaryInclude : content.length;
          snippet += content.substring(start, end);
          snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0], mvalue.indices[0][1] - mvalue.indices[0][0] + 1));
        }
      });
    }

    if (snippet.length < 1) {
      snippet += content.substring(0, summaryInclude * 2);
    }
    //pull template from hugo templarte definition
    var templateDefinition = document.getElementById("search-result-template").innerHTML;
    //replace values
    var output = render(templateDefinition, {
      key: key,
      title: value.item.title,
      link: value.item.permalink,
      tags: value.item.tags,
      categories: value.item.categories,
      snippet: snippet
    });
    document.getElementById("search-results").appendChild(htmlToElement(output));

    snippetHighlights.forEach(function (snipvalue, snipkey) {
      new Mark(document.getElementById("summary-" + key)).mark(snipvalue);
    });

  });
}populateResults

function render(templateString, data) {
  var conditionalMatches, conditionalPattern, copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = templateString;
  while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
    if (data[conditionalMatches[1]]) {
      //valid key, remove conditionals, leave content.
      copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
    } else {
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0], '');
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  var key, find, re;
  for (key in data) {
    find = '\\$\\{\\s*' + key + '\\s*\\}';
    re = new RegExp(find, 'g');
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}

/**
 * By Mark Amery: https://stackoverflow.com/a/35385518
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}