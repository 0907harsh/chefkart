/** @format */

const oorderTableBody = document.querySelector("#leadTableBody");
let leads = [];
let markup;

fetch("/lead", {
    method: "GET",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
})
    .then(async (res) => {
        leads = await res.json();
        console.log(leads);
        markup = generateOrderMarkup(leads);
        oorderTableBody.innerHTML = markup;
    })
    .catch((err) => {
        console.log(err);
    });

function generateOrderMarkup() {
    var count = 0;
    return leads
        .map((lead) => {
            count = count + 1;
            return `
            <tr>
                <td>
                    ${lead.name}
                </td>
                <td>${lead.contact}</td>
                <td>${lead.reward}</td>
                <td><form action="/lead/status" method="POST" >
                    <input type="hidden" name="leadId" value="${lead.id}">
                    <select name="status" onchange="this.form.submit()" class="uk-select">
                        <option value="New" ${
                            lead.status === "New" ? 'selected="true"' : ""
                        }>New</option>
                        <option value="In-pipeline" ${
                            lead.status === "In-pipeline"
                                ? 'selected="true"'
                                : ""
                        }>In-Pipeline</option>
                        <option value="Successful" ${
                            lead.status === "Successful"
                                ? 'selected="true"'
                                : ""
                        }>Successful</option>
                        <option value="Junk" ${
                            lead.status === "Junk" ? 'selected="true"' : ""
                        }>Junk</option>
                    </select>

                </form>
                </td>
                <td>${lead.createdAt}</td>
                <td><form action="/lead/remove" method="POST">
                    <input type="hidden" name="leadId" value="${lead.id}">
                    <button type="submit">Delete Lead</button></form>
                </td>
            </tr>`;
        })
        .join("");
}
