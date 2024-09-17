function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function App() {
    const [fables, setFables] = React.useState([]);
    const [currentFable, setCurrentFable] = React.useState({})
    const [viewedFables, setViewedFables] = React.useState([])

    const setRandomFable = (data) => {
        let fablesData = []
        if (Array.isArray(data) && data[0].fable !== undefined && data[0].author !== undefined) {
            fablesData = data
        } else {
            fablesData = fables
        }

        let index = 0
        while (true) {
            index = getRandomInt(0, fablesData.length)
            if (viewedFables.length === fables.length) {
                index = 0
                setViewedFables([0])
                break
            }
            if (!viewedFables.includes(index)) {
                setViewedFables((viewedFables) => viewedFables.concat(index))
                break
            }
        }

        if (isNaN(index)) {
            setCurrentFable(fablesData[0])
        } else {
            setCurrentFable(fablesData[index])
        }
    }

    React.useEffect(async function () {
        try {
            const response = await fetch('./fables.json')
            const data = await response.json()
            setFables(data)
            setRandomFable(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    if (currentFable !== undefined) {
        return <>
            <div class="container" onClick={setRandomFable}>
                <div class="fable">
                    <p>{currentFable.fable}</p>
                </div>
                <div class="author">
                    <p>{currentFable.author}</p>
                </div>
            </div>
            <button onClick={setRandomFable}>Next</button>
        </>
    }
    return null
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
