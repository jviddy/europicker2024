document.addEventListener("DOMContentLoaded", function() {
    var tables = document.getElementsByClassName("teamPicker");
    var selectedTeams = [];
    var costTotal = 0;
    var teamCount = 0;
    const costCap = 30;
    const maxTeamCount = 3;

    let teamList = [
        {"countryName":"0","groupLetter":"0","groupPos":"0","fifaRank":0,"cost":0},
        {"countryName":"Georgia","groupLetter":"F","groupPos":"2","fifaRank":75,"cost":1},
        {"countryName":"Albania","groupLetter":"B","groupPos":"4","fifaRank":66,"cost":2},
        {"countryName":"Slovenia","groupLetter":"C","groupPos":"1","fifaRank":57,"cost":3},
        {"countryName":"Slovakia","groupLetter":"E","groupPos":"2","fifaRank":48,"cost":4},
        {"countryName":"Romania","groupLetter":"E","groupPos":"3","fifaRank":46,"cost":5},
        {"countryName":"Turkey","groupLetter":"F","groupPos":"1","fifaRank":40,"cost":6},
        {"countryName":"Scotland","groupLetter":"A","groupPos":"2","fifaRank":39,"cost":7},
        {"countryName":"Czech Republic","groupLetter":"F","groupPos":"4","fifaRank":36,"cost":8},
        {"countryName":"Serbia","groupLetter":"C","groupPos":"3","fifaRank":33,"cost":9},
        {"countryName":"Poland","groupLetter":"D","groupPos":"1","fifaRank":28,"cost":10},
        {"countryName":"Hungary","groupLetter":"A","groupPos":"3","fifaRank":26,"cost":11},
        {"countryName":"Austria","groupLetter":"D","groupPos":"3","fifaRank":25,"cost":12},
        {"countryName":"Ukraine","groupLetter":"E","groupPos":"4","fifaRank":22,"cost":13},
        {"countryName":"Denmark","groupLetter":"C","groupPos":"2","fifaRank":21,"cost":14},
        {"countryName":"Switzerland","groupLetter":"A","groupPos":"4","fifaRank":19,"cost":15},
        {"countryName":"Germany","groupLetter":"A","groupPos":"1","fifaRank":16,"cost":16},
        {"countryName":"Croatia","groupLetter":"B","groupPos":"2","fifaRank":10,"cost":17},
        {"countryName":"Italy","groupLetter":"B","groupPos":"3","fifaRank":9,"cost":18},
        {"countryName":"Spain","groupLetter":"B","groupPos":"1","fifaRank":8,"cost":19},
        {"countryName":"Netherlands","groupLetter":"D","groupPos":"2","fifaRank":7,"cost":20},
        {"countryName":"Portugal","groupLetter":"F","groupPos":"3","fifaRank":6,"cost":21},
        {"countryName":"England","groupLetter":"C","groupPos":"4","fifaRank":4,"cost":22},
        {"countryName":"Belgium","groupLetter":"E","groupPos":"1","fifaRank":3,"cost":23},
        {"countryName":"France","groupLetter":"D","groupPos":"4","fifaRank":2,"cost":24}
    ]

    for (var i = 0; i < tables.length; i++) {
        var rows = tables[i].getElementsByClassName("rowPickTeam");

        for (var j = 0; j < rows.length; j++) {
            var cells = rows[j].getElementsByTagName("td");

            for (var k = 0; k < cells.length; k++) {
                cells[k].addEventListener("click", function() {
                    var row = this.parentNode; // Get the parent tr element
                    var rowId = row.id;
                    addRemoveTeam(rowId);
                    toggleRowColor(row);
                });
            }
        }
    }

    function addRemoveTeam(rowId) {
        console.log("Clicked row id:", rowId);
        var maxTeams = false;
        if (teamCount == maxTeamCount) {
            maxTeams = true;

        }          
        if (selectedTeams.includes(rowId)) {
            // If row id is already in array, remove it
            var index = selectedTeams.indexOf(rowId);
            selectedTeams.splice(index, 1);
            costTotal -= parseInt(rowId);
            teamCount -= 1;
        } else {
            // If row id is not in array, add it
            selectedTeams.push(rowId);
            costTotal += parseInt(rowId);
            teamCount += 1;
        }

        console.log("Selected teams array:", selectedTeams);
        
        displaySelectedTeams();
    }


    function toggleRowColor(row) {
        if (row.style.backgroundColor === "") {
            // If row color is not set, set it to a different color
            row.style.backgroundColor = "lightblue";
        } else {
            // If row color is set, reset it to default
            row.style.backgroundColor = "";
        }
    }


    function displaySelectedTeams() {
        var selectedTeamsContainer = document.getElementById("selectedTeams");
        if (selectedTeamsContainer) {
            // Clear previous content
            selectedTeamsContainer.innerHTML = "";

            // Create table element
            var table = document.createElement("table");

            // Create table header
            var headerRow = table.insertRow();
            var headers = ["Country", "Cost"];
            for (var h = 0; h < headers.length; h++) {
                var headerCell = document.createElement("th");
                headerCell.textContent = headers[h];
                headerRow.appendChild(headerCell);
            }

            // Populate table with selected teams
            for (var t = 0; t < selectedTeams.length; t++) {
                var selectedTeam = parseInt(selectedTeams[t]);
                    var tcost = teamList[selectedTeam].cost;
                    console.log (tcost);
                    var row = table.insertRow();
                    //console.log(tCost);
                    row.setAttribute('id', tcost);
                    row.addEventListener("click", function() {
                        addRemoveTeam(this.id);
                        var teamRow = document.getElementById(this.id);
                        toggleRowColor(teamRow);
                    });
                    
                    var countryCell = row.insertCell();
                    countryCell.textContent = teamList[selectedTeam].countryName;
                    
                    var costCell = row.insertCell();
                    costCell.textContent = teamList[selectedTeam].cost;
                }
            
                var totalRow = table.insertRow();
                totalRow.className = "totalRow"
                var countryCell = totalRow.insertCell();
                countryCell.textContent = "Total cost";
                
                var costCell = totalRow.insertCell();
                costCell.textContent = costTotal;
            
                // Append table to selectedTeamsContainer
                selectedTeamsContainer.appendChild(table);    
            }

           
        
    }
    
   
});