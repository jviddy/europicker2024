document.addEventListener("DOMContentLoaded", function() {
    var tables = document.getElementsByClassName("teamPicker");
    var selectedTeams = [];
    var costTotal = 0;
    var teamCount = 0;
    const costCap = 30;
    const maxTeamCount = 3;

    var maxTeamReached = false;
    var maxCostReached = false;

    let teamList = [
        {"countryId":"0","countryName":"0","groupLetter":"0","groupPos":"0","fifaRank":0,"cost":0},
        {"countryId":"F2","countryName":"Georgia","groupLetter":"F","groupPos":"2","fifaRank":75,"cost":1},
        {"countryId":"B4","countryName":"Albania","groupLetter":"B","groupPos":"4","fifaRank":66,"cost":2},
        {"countryId":"C1","countryName":"Slovenia","groupLetter":"C","groupPos":"1","fifaRank":57,"cost":3},
        {"countryId":"E2","countryName":"Slovakia","groupLetter":"E","groupPos":"2","fifaRank":48,"cost":4},
        {"countryId":"E3","countryName":"Romania","groupLetter":"E","groupPos":"3","fifaRank":46,"cost":5},
        {"countryId":"F1","countryName":"Turkey","groupLetter":"F","groupPos":"1","fifaRank":40,"cost":6},
        {"countryId":"A2","countryName":"Scotland","groupLetter":"A","groupPos":"2","fifaRank":39,"cost":7},
        {"countryId":"F4","countryName":"Czech Republic","groupLetter":"F","groupPos":"4","fifaRank":36,"cost":8},
        {"countryId":"C3","countryName":"Serbia","groupLetter":"C","groupPos":"3","fifaRank":33,"cost":9},
        {"countryId":"D1","countryName":"Poland","groupLetter":"D","groupPos":"1","fifaRank":28,"cost":10},
        {"countryId":"A3","countryName":"Hungary","groupLetter":"A","groupPos":"3","fifaRank":26,"cost":11},
        {"countryId":"D3","countryName":"Austria","groupLetter":"D","groupPos":"3","fifaRank":25,"cost":12},
        {"countryId":"E4","countryName":"Ukraine","groupLetter":"E","groupPos":"4","fifaRank":22,"cost":13},
        {"countryId":"C2","countryName":"Denmark","groupLetter":"C","groupPos":"2","fifaRank":21,"cost":14},
        {"countryId":"A4","countryName":"Switzerland","groupLetter":"A","groupPos":"4","fifaRank":19,"cost":15},
        {"countryId":"A1","countryName":"Germany","groupLetter":"A","groupPos":"1","fifaRank":16,"cost":16},
        {"countryId":"B2","countryName":"Croatia","groupLetter":"B","groupPos":"2","fifaRank":10,"cost":17},
        {"countryId":"B3","countryName":"Italy","groupLetter":"B","groupPos":"3","fifaRank":9,"cost":18},
        {"countryId":"B1","countryName":"Spain","groupLetter":"B","groupPos":"1","fifaRank":8,"cost":19},
        {"countryId":"D2","countryName":"Netherlands","groupLetter":"D","groupPos":"2","fifaRank":7,"cost":20},
        {"countryId":"F3","countryName":"Portugal","groupLetter":"F","groupPos":"3","fifaRank":6,"cost":21},
        {"countryId":"C4","countryName":"England","groupLetter":"C","groupPos":"4","fifaRank":4,"cost":22},
        {"countryId":"E1","countryName":"Belgium","groupLetter":"E","groupPos":"1","fifaRank":3,"cost":23},
        {"countryId":"D4","countryName":"France","groupLetter":"D","groupPos":"4","fifaRank":2,"cost":24},
    ]

    for (var i = 0; i < tables.length; i++) {
        var rows = tables[i].getElementsByClassName("rowPickTeam");

        for (var j = 0; j < rows.length; j++) {
            var cells = rows[j].getElementsByTagName("td");

            for (var k = 0; k < cells.length; k++) {
                cells[k].addEventListener("click", function() {
                    var row = this.parentNode; // Get the parent tr element
                    var rowId = row.id;
                    addRemoveTeam(row, rowId);
                    //toggleRowColor(row);
                });
            }
        }
    }

    function addRemoveTeam(row, rowId) {
        console.log("Clicked row id:", rowId);     
        if (selectedTeams.includes(rowId)) {
            // If row id is already in array, remove it
            var index = selectedTeams.indexOf(rowId);
            selectedTeams.splice(index, 1);

            costTotal -= parseInt(getTeamCost(rowId));
            teamCount -= 1;
            toggleRowColor(row);
        } else {
            if(teamCount >= maxTeamCount){
               console.log("at max");//turn on can't add team message 
            } else {
                console.log("still room");
                // If row id is not in array, add it
            selectedTeams.push(rowId);
            costTotal += parseInt(getTeamCost(rowId));
            teamCount += 1;
            toggleRowColor(row);
            //}
            }
            
        }

        console.log("Selected teams array:", selectedTeams);
        
        displaySelectedTeams();
        updateTeamCount();
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

    function getTeamCost (teamID){
        var pickedTeam = teamList.find(country => country.countryId === teamID);
        return pickedTeam.cost;
    }

    function getTeamName (teamID){ 
        var pickedTeam = teamList.find(country => country.countryId === teamID);
        return pickedTeam.countryName;
    }

    function updateTeamCount () {
        if(costTotal > costCap){
            maxCostReached = true;
            showHideError("errMaxCost","inline");
        } else {
            maxCostReached = false;
            showHideError("errMaxCost","none");
        }
    
        if (teamCount >= maxTeamCount){
            maxTeamReached = true;
            showHideError("errMaxTeams","inline");
        } else {
            maxTeamReached = false;
            showHideError("errMaxTeams","none");
        }
        console.log("max teams reached: " + maxTeamReached);
        console.log("cost cap exceed: " + maxCostReached)
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
                console.log(selectedTeams[t])
                    var row = table.insertRow();
                    //console.log(tCost);
                    row.setAttribute('id', selectedTeams[t]);
                    row.addEventListener("click", function() {
                        addRemoveTeam(row, this.id);
                        var teamRow = document.getElementById(this.id);
                        toggleRowColor(teamRow);
                    });
                    
                    var countryCell = row.insertCell();
                    countryCell.textContent = getTeamName(selectedTeams[t]);
                    
                    var costCell = row.insertCell();
                    costCell.textContent = getTeamCost(selectedTeams[t]);
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

    function showHideError(elId, RequiredState) {
        console.log("elid: " + elId);
        console.log("required: " + RequiredState);
        var htmlElement = document.getElementById(elId);
        htmlElement.style.display = RequiredState;
    }
    
   
});