// credit to shomrat on stack overflow for this function
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

// main function that parses the XML in the HTML document
async function main(XMLDoc) {
    const XMLFilePath = './ExampleFiles/google.com!murojewelry.com!1716422400!1716508799.xml';
    const XMLDOc = XMLDoc;

    if (XMLDOc) {
        let org = XMLDOc.getElementsByTagName('org_name')[0].innerHTML;
        let date_begin = XMLDOc.getElementsByTagName('begin')[0].innerHTML;
        let date_end = XMLDOc.getElementsByTagName('end')[0].innerHTML;        
        const dateStart = timeConverter(date_begin);
        const dateEnd = timeConverter(date_end);
        let adkim = XMLDOc.getElementsByTagName('adkim')[0].innerHTML;
        let aspf = XMLDOc.getElementsByTagName('aspf')[0].innerHTML;
        let pDoc = XMLDOc.getElementsByTagName('p')[0].innerHTML;
        let pct = XMLDOc.getElementsByTagName('pct')[0].innerHTML;

        let orgP = document.getElementById('org');
        orgP.innerHTML = org;

        let timeP = document.getElementById('begin-time');
        timeP.innerHTML = dateStart

        timeP = document.getElementById('end-time');
        timeP.innerHTML = dateEnd;

        let adkimP = document.getElementById('adkim');
        adkimP.innerHTML = adkim;

        let aspfP = document.getElementById('aspf');
        aspfP.innerHTML = aspf;

        let pP = document.getElementById('p');
        pP.innerHTML = pDoc;

        let pctP = document.getElementById('pct');
        pctP.innerHTML = pct;

        let records = XMLDOc.getElementsByTagName('record');
        for (let record of records) {
            let tbody = document.getElementsByTagName('tbody')[0];
            let tr = document.createElement('tr');
            tr.classList.add('table-cont');

            let elements = {
                ip: record.getElementsByTagName('source_ip')[0].innerHTML,
                email: record.getElementsByTagName('count')[0].innerHTML,
                header: record.getElementsByTagName('header_from')[0].innerHTML,
                disposition: record.getElementsByTagName('disposition')[0].innerHTML,
                dkim: record.getElementsByTagName('dkim')[0].innerHTML,
                spf: record.getElementsByTagName('spf')[0].innerHTML,
            }
            
            for (const [key, value] of Object.entries(elements)) {
                let td = document.createElement('td');
                if (`${value}` == 'fail' || `${value}` == 'pass') {
                    let div = document.createElement('div');
                    div.classList.add(`${value}`, 'status-button');
                    div.innerHTML = `${value}`
                    td.appendChild(div);
                } else {
                    td.innerHTML = `${value}`;
                }
                tr.appendChild(td);
            }  

            // add tr to table element in document
            tbody.appendChild(tr);

        }
        
    }
}

document.getElementById('xmlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileIn = document.getElementById('xmlFile');
    if (fileIn.files.length == 0) {
        alert('Please enter a valid file!');
        return;
    };

    const file = fileIn.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const XMLtext = event.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(XMLtext, "application/xml");
        main(xmlDoc);
    }
    reader.onerror = function() {
        alert('Error reading file');
    };
    reader.readAsText(file);
});