const sort = document.getElementById("sort")

sort.addEventListener('change', selectedSort)

function selectedSort () {
  const sortOption = sort.value
  switch (sortOption) {
    case 'asc':
    case 'desc':
    case 'category':
    case 'location':
      console.log(`${sortOption}`)
      break
  }
}
