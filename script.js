'use strict'

const cube = document.querySelector('.cube')

let edge1 = getEdge(1)
const edge2 = getEdge(2)
const edge3 = getEdge(3)
const edge4 = getEdge(4)
const edge5 = getEdge(5)
let edge6 = getEdge(6)

// console.log('edge1:', edge1)
// console.log('edge2:', edge2)
// console.log('edge3:', edge3)
// console.log('edge4:', edge4)
// console.log('edge5:', edge5)
// console.log('edge6:', edge6)

// cube.style.transform = 'rotateX(235deg) rotateY(0deg) rotateZ(315deg)'

const rotation = document.getElementById('rotation')
rotation.addEventListener('input', () => {
	const viewingAngles = [
		'rotateX(235deg) rotateY(0deg) rotateZ(315deg)',
		'rotateX(145deg) rotateY(315deg) rotateZ(270deg)',
		'rotateX(55deg) rotateY(0deg) rotateZ(225deg)',
		'rotateX(325deg) rotateY(45deg) rotateZ(270deg)',
		'rotateX(325deg) rotateY(315deg) rotateZ(0deg)',
		'rotateX(325deg) rotateY(315deg) rotateZ(90deg)',
		'rotateX(325deg) rotateY(315deg) rotateZ(180deg)',
		'rotateX(325deg) rotateY(315deg) rotateZ(270deg)',
		'rotateX(55deg) rotateY(180deg) rotateZ(45deg)',
		'rotateX(325deg) rotateY(225deg) rotateZ(0deg)',
		'rotateX(235deg) rotateY(180deg) rotateZ(315deg)',
		'rotateX(145deg) rotateY(135deg) rotateZ(0deg)',
		'rotateX(325deg) rotateY(135deg) rotateZ(0deg)',
		'rotateX(145deg) rotateY(45deg) rotateZ(90deg)',
		'rotateX(145deg) rotateY(45deg) rotateZ(0deg)',
		'rotateX(145deg) rotateY(45deg) rotateZ(270deg)',
		'rotateX(325deg) rotateY(45deg) rotateZ(0deg)',
		'rotateX(235deg) rotateY(0deg) rotateZ(45deg)',
		'rotateX(145deg) rotateY(315deg) rotateZ(0deg)',
		'rotateX(55deg) rotateY(0deg) rotateZ(315deg)',
		'rotateX(55deg) rotateY(180deg) rotateZ(315deg)',
		'rotateX(325deg) rotateY(225deg) rotateZ(270deg)',
		'rotateX(235deg) rotateY(180deg) rotateZ(225deg)',
		'rotateX(145deg) rotateY(135deg) rotateZ(270deg)',
	]

	const angle = rotation.value
	console.log(viewingAngles[0])
	cube.style.transform = viewingAngles[angle]
})

const transpose = matrix => {
	const matrixT = []
	for (let i = 0; i < matrix[0].length; i++) {
		matrixT.push([])
	}

	for (let i = 0; i < matrixT.length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			matrixT[i][j] = matrix[j][i]
		}
	}

	return matrixT
}

function getEdge(number) {
	const edge = [[], [], []]

	const tds = cube.querySelectorAll(`[data-edge="${number}"]`)

	let counter = 0
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			edge[i][j] = tds[counter++]
		}
	}

	return edge
}

/*
	Функция вращает ряд (вид спереди).
	Принимает грани на которых находятся ряды и номер ряда.
*/
function rowRotation(edges, row) {
	// if (edges.includes(edge4)) {
	// 	edge4.reverse()
	// }

	const tempEdges = []
	for (let i = 0; i < 3; i++) {
		tempEdges[i] = edges[0][row][i].className
	}

	for (let n = 0; n < edges.length - 1; n++) {
		for (let i = 0; i < 3; i++) {
			edges[n][row][i].className = edges[n + 1][row][i].className
		}
	}

	for (let i = 0; i < 3; i++) {
		edges[edges.length - 1][row][i].className = tempEdges[i]
	}

	// if (edges.includes(edge4)) {
	// 	edge4.reverse()
	// }
}

/*
	Функция вращает грань.
	Принимает № грани и флаг - по часовой стрелке или нет.
*/
const edgeRotation = (adjoiningEdgeNumber, clockwise = true) => {
	clockwise = Boolean(clockwise)
	let edge = null

	switch (adjoiningEdgeNumber) {
		case '1':
			edge = edge1
			break
		case '2':
			edge = edge2
			break
		case '3':
			edge = edge3
			break
		case '4':
			edge = edge4
			break
		case '5':
			edge = edge5
			break
		case '6':
			edge = edge6
			break
	}

	// Массив цветов.
	let colors = []

	for (let i = 0; i < edge.length; i++) {
		colors.push([])
		for (let j = 0; j < edge[0].length; j++) {
			colors[i][j] = edge[i][j].className
		}
	}

	const colorsTurned = []
	for (let i = 0; i < colors[0].length; i++) {
		colorsTurned.push([])
	}

	// Вращение матрицы по часовой стрелке.
	if (clockwise) {
		for (let i = 0; i < colorsTurned.length; i++) {
			let counter = 1
			for (let j = 0; j < colorsTurned.length; j++) {
				colorsTurned[i][j] = colors[colors.length - counter][i]
				counter++
			}
		}
	}
	// Вращение матрицы против часовой стрелки.
	else {
		for (
			let i = 0, counter = colorsTurned.length - 1;
			i < colorsTurned.length;
			i++
		) {
			for (let j = 0; j < colorsTurned.length; j++) {
				colorsTurned[i][j] = colors[j][counter]
			}

			counter--
		}
	}

	// Запишем в ячейки грани новые цвета (после поворота).
	for (let i = 0; i < edge.length; i++) {
		for (let j = 0; j < edge[0].length; j++) {
			edge[i][j].className = colorsTurned[i][j]
		}
	}
}

/*
	Вращение столбиков (вид спереди).
	Принимает грани на которых находятся столбики и номер столбика.
*/
function columnRotation(edges, column) {
	if (edges.includes(edge3)) {
		Array.prototype.forEach.call(edge3, item => item.reverse())
	}

	const tempEdges = []
	for (let i = 0; i < 3; i++) {
		tempEdges[i] = edges[0][i][column].className
	}

	for (let n = 0; n < edges.length - 1; n++) {
		for (let i = 0; i < 3; i++) {
			edges[n][i][column].className = edges[n + 1][i][column].className
		}
	}

	for (let i = 0; i < 3; i++) {
		edges[edges.length - 1][i][column].className = tempEdges[i]
	}

	if (edges.includes(edge3)) {
		Array.prototype.forEach.call(edge3, item => item.reverse())
	}
}

// Вращение рядов влево.
cube.querySelectorAll('[data-event="edge-left"]').forEach(item => {
	item.addEventListener('click', event => {
		const adjoiningEdgeNumber = event.target.dataset.adjoiningEdge
		if (adjoiningEdgeNumber) {
			const clockwise =
				event.target.dataset.adjoiningEdgeRotationClockwise === 'true'
					? true
					: false

			edgeRotation(adjoiningEdgeNumber, clockwise)
		}

		const edges = [edge5, edge4, edge3, edge2].reverse()
		const row = parseInt(event.target.dataset.row) - 1

		rowRotation(edges, row)
	})
})

// Вращение рядов вправо.
cube.querySelectorAll('[data-event="edge-right"]').forEach(item => {
	item.addEventListener('click', event => {
		const adjoiningEdgeNumber = event.target.dataset.adjoiningEdge
		if (adjoiningEdgeNumber) {
			const clockwise =
				event.target.dataset.adjoiningEdgeRotationClockwise === 'true'
					? true
					: false
			edgeRotation(adjoiningEdgeNumber, clockwise)
		}

		const edges = [edge5, edge4, edge3, edge2]
		const row = parseInt(event.target.dataset.row) - 1

		rowRotation(edges, row)
	})
})

// Вращение фронтальных столбиков вверх.
cube.querySelectorAll('[data-event="edge-top"]').forEach(item => {
	item.addEventListener('click', event => {
		const adjoiningEdgeNumber = event.target.dataset.adjoiningEdge
		if (adjoiningEdgeNumber) {
			const clockwise =
				event.target.dataset.adjoiningEdgeRotationClockwise === 'true'
					? true
					: false
			edgeRotation(adjoiningEdgeNumber, clockwise)
		}

		const edges = [edge1, edge2, edge6, edge4]
		const column = parseInt(event.target.dataset.column) - 1

		columnRotation(edges, column)
	})
})

// Вращение фронтальных столбиков вниз.
cube.querySelectorAll('[data-event="edge-down"]').forEach(item => {
	item.addEventListener('click', event => {
		const adjoiningEdgeNumber = event.target.dataset.adjoiningEdge
		if (adjoiningEdgeNumber) {
			const clockwise =
				event.target.dataset.adjoiningEdgeRotationClockwise === 'true'
					? true
					: false
			edgeRotation(adjoiningEdgeNumber, clockwise)
		}

		const edges = [edge1, edge2, edge6, edge4].reverse()
		const column = parseInt(event.target.dataset.column) - 1

		columnRotation(edges, column)
	})
})

// Вращение боковых столбиков влево (кнопки на верхней грани).
cube.querySelectorAll('[data-event="top-edge-left"]').forEach(item => {
	item.addEventListener('click', event => {
		const adjoiningEdgeNumber = event.target.dataset.adjoiningEdge
		if (adjoiningEdgeNumber) {
			const clockwise =
				event.target.dataset.adjoiningEdgeRotationClockwise === 'true'
					? true
					: false
			edgeRotation(adjoiningEdgeNumber, clockwise)
		}

		edge1 = transpose(edge1)
		edge6.reverse()
		edge6 = transpose(edge6)
		Array.prototype.forEach.call(edge6, item => item.reverse())
		edge6.reverse()
		Array.prototype.forEach.call(edge6, item => item.reverse())
		edge5.reverse()

		const edges = [edge1, edge3, edge6, edge5]

		const column = parseInt(event.target.dataset.row) - 1

		columnRotation(edges, column)

		edge1 = transpose(edge1)
		edge6.reverse()
		edge6 = transpose(edge6)
		Array.prototype.forEach.call(edge6, item => item.reverse())
		edge6.reverse()
		Array.prototype.forEach.call(edge6, item => item.reverse())
		edge5.reverse()
	})
})

// Вращение боковых столбиков вправо (кнопки на верхней грани).
cube.querySelectorAll('[data-event="top-edge-right"]').forEach(item => {
	item.addEventListener('click', event => {
		const adjoiningEdgeNumber = event.target.dataset.adjoiningEdge
		if (adjoiningEdgeNumber) {
			const clockwise =
				event.target.dataset.adjoiningEdgeRotationClockwise === 'true'
					? true
					: false
			edgeRotation(adjoiningEdgeNumber, clockwise)
		}

		edge1 = transpose(edge1)
		edge6.reverse()
		edge6 = transpose(edge6)
		Array.prototype.forEach.call(edge6, item => item.reverse())
		edge6.reverse()
		Array.prototype.forEach.call(edge6, item => item.reverse())
		edge5.reverse()

		const edges = [edge1, edge3, edge6, edge5].reverse()
		const column = parseInt(event.target.dataset.row) - 1

		columnRotation(edges, column)

		edge1 = transpose(edge1)
		edge6.reverse()
		edge6 = transpose(edge6)
		Array.prototype.forEach.call(edge6, item => item.reverse())
		edge6.reverse()
		Array.prototype.forEach.call(edge6, item => item.reverse())
		edge5.reverse()
	})
})
