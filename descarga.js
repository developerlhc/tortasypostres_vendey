function downloadExcel() {
    var table = document.getElementById("myTable");
    var rows = table.querySelectorAll("tr");

    // Construye el contenido del archivo Excel (XLSX) en formato XML con estilos
    var excelContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns="http://www.w3.org/TR/REC-html40">
    <head>
    <!--[if gte mso 9]><xml>
    <x:ExcelWorkbook>
    <x:ExcelWorksheets>
    <x:ExcelWorksheet>
    <x:Name>Sheet 1</x:Name>
    <x:WorksheetOptions>
    <x:DisplayGridlines/>
    </x:WorksheetOptions>
    </x:ExcelWorksheet>
    </x:ExcelWorksheets>
    </x:ExcelWorkbook>
    </xml><![endif]-->
    <style>
    .header {
      background-color: #FFCC00; /* Color de encabezado */
      font-weight: bold;
      text-align: center;
    }
    </style>
    </head>
    <body>
    <table border="1">
      <tr><td></td><td></td></tr> <!-- Fila vacía para empezar desde la fila 2 -->
      <tr><td></td><td>
        <table border="1">
    `;

    rows.forEach(function(row, rowIndex) {
      excelContent += "<tr>";
      var cells = row.querySelectorAll("th, td");
      cells.forEach(function(cell) {
        if (rowIndex === 0) {
          excelContent += '<td class="header">' + cell.textContent + '</td>';
        } else {
          excelContent += "<td>" + cell.textContent + "</td>";
        }
      });
      excelContent += "</tr>";
    });

    excelContent += `
        </table>
      </td></tr>
    </table>
    </body>
    </html>
    `;

    // Crea un Blob con los datos del archivo Excel
    var blob = new Blob([excelContent], { type: "application/vnd.ms-excel" });

    // Crea un enlace temporal para la descarga
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Reporte_ventas.xls"; // XLS en lugar de XLSX por simplicidad
    document.body.appendChild(link);
    link.click();

    // Elimina el enlace temporal
    document.body.removeChild(link);
  }