/** LIBRERIAS */
import React, { useRef } from 'react';

/** ESTILOS */
import './estilos.sass';

export const Notes = ({setNotes}) => {
	const Table = useRef(null);
	let data = [];

	const addHomework = ()=>{
		const row = `
		<tr>
			<td><button id="${Table.current.rows.length}">🪓</button></td>
			<td>${Table.current.rows.length}</td>
			<td><input type="text"/></td>

			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
		</tr>
		`;
		Table.current.insertRow(-1).innerHTML = row;

		Table.current.rows[Table.current.rows.length-1].cells[0]
		.firstElementChild
		.addEventListener('click', (e) => deleteItem(parseInt(e.target.id)));
	}

	const deleteItem = (index) => {
		Table.current.deleteRow(index);
		
		Array.from(Table.current.rows).forEach(function (fila, ind) {
			if(ind !== 0){
				fila.cells[0].firstElementChild.id = ind;
				fila.cells[1].innerText = ind;
			}
		});
	}

	const getPlans = ()=>{
		Array.from(Table.current.rows).forEach(function (fila, ind) {
			if(ind !== 0){
				let dataRow = {};
				dataRow.nro = fila.cells[1].textContent;
				dataRow.nombre = fila.cells[2].firstElementChild.value;
				dataRow.descripcion = fila.cells[3].firstElementChild.value;
				dataRow.porcentaje = fila.cells[4].firstElementChild.value;
				dataRow.nota = fila.cells[5].firstElementChild.value;
				data.push(dataRow)
			}
		});
		setNotes(data);
	}

	return (	
		<section className='notes'>
			<table ref={Table} className='notes__table'>
				<tbody>
					<tr className='notes__table--headers'>
						<th></th>
						<th>Nro </th>
						<th>Nombre </th>
						<th>Descripción </th>
						<th>Porcentaje </th>
						<th>Nota </th>
					</tr>
				</tbody>
			</table>
			<div><button onClick={()=>{addHomework()}} >+ Nuevo</button></div>
			<button onClick={() => {getPlans()}}>Confirmar</button>
		</section>
	);
};