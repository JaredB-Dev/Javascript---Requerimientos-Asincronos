import { getSalesCoffee } from "./requirements.js";

let processSalesCoffee = async () => {

    try {

        let response = await getSalesCoffee();

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const text = await response.text();
        let parser = new DOMParser();

        const arbol = parser.parseFromString(text, "application/xml")

        const tbody = document.querySelector("#example tbody")
        tbody.innerHTML = ``;

        let contenidoHTML = "";
        let rows = arbol.getElementsByTagName("row")
        for (let row of rows) {
            let tdHTML = `
                <tr>
                    <td class="border px-4 py-2">[HOUR_OF_DAY]</td>
                    <td class="border px-4 py-2">[CASH_TYPE]</td>
                    <td class="border px-4 py-2">[MONEY]</td>
                    <td class="border px-4 py-2">[COFFEE_NAME]</td>
                    <td class="border px-4 py-2">[TIME_OF_DAY]</td>
                    <td class="border px-4 py-2">[WEEKDAY]</td>
                    <td class="border px-4 py-2">[MONTH_NAME]</td>
                    <td class="border px-4 py-2">[WEEKDAYSORT]</td>
                    <td class="border px-4 py-2">[MONTHSORT]</td>
                    <td class="border px-4 py-2">[DATE]</td>
                    <td class="border px-4 py-2">[TIME]</td>
                </tr>`;

            const hour_of_day = row.getElementsByTagName("hour_of_day")[0].textContent;
            const cash_type = row.getElementsByTagName("cash_type")[0].textContent;
            const money = row.getElementsByTagName("money")[0].textContent;
            const coffee_name = row.getElementsByTagName("coffee_name")[0].textContent;
            const time_of_day = row.getElementsByTagName("Time_of_Day")[0].textContent;
            const weekday = row.getElementsByTagName("Weekday")[0].textContent;
            const month_name = row.getElementsByTagName("Month_name")[0].textContent;
            const weekdaysort = row.getElementsByTagName("Weekdaysort")[0].textContent;
            const monthsort = row.getElementsByTagName("Monthsort")[0].textContent;
            const date = row.getElementsByTagName("Date")[0].textContent;
            const time = row.getElementsByTagName("Time")[0].textContent;

            tdHTML = tdHTML.replaceAll("[HOUR_OF_DAY]", hour_of_day);
            tdHTML = tdHTML.replaceAll("[CASH_TYPE]", cash_type);
            tdHTML = tdHTML.replaceAll("[MONEY]", money);
            tdHTML = tdHTML.replaceAll("[COFFEE_NAME]", coffee_name);
            tdHTML = tdHTML.replaceAll("[TIME_OF_DAY]", time_of_day);
            tdHTML = tdHTML.replaceAll("[WEEKDAY]", weekday);
            tdHTML = tdHTML.replaceAll("[MONTH_NAME]", month_name);
            tdHTML = tdHTML.replaceAll("[WEEKDAYSORT]", weekdaysort);
            tdHTML = tdHTML.replaceAll("[MONTHSORT]", monthsort);
            tdHTML = tdHTML.replaceAll("[DATE]", date);
            tdHTML = tdHTML.replaceAll("[TIME]", time);

            contenidoHTML += tdHTML;
        };

        //Cargar topdo el contenido de una vez, ya que si se realiza dentro del for la pagina tarda mucho en cargar porque por cada for se copia y pega toda la informacion de cada plantilla
        tbody.innerHTML = contenidoHTML;
        // Datos cargados y listo para mostrar en el DataTable
        $('#example').DataTable();

    } catch (error) {
        alert(error.message);
    };

};

(() => {
    processSalesCoffee();
})();