'use strict'

// use async to execute tasks in sequential, parallel limited, full parallel

const processTask = async duration => {
    console.log(`⏳  task with ${duration}ms started`)

    const timerPromise = duration => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`✅  task with ${duration}ms ended`)
                resolve(duration)
            }, duration)
        }) 
    }
    return await timerPromise(duration)
}

const tasks = [2000, 5000, 1000]

// serial
const serial = async tasks => {
    const results = []
    for (const task of tasks) {
        const result = await processTask(task)
        results.push(result)
    }

    console.log('🔵 results:', results)
}

// parallel
// REF: https://techbrij.com/javascript-async-await-parallel-sequence
const parallel = async tasks => {
    const results = await Promise.all(tasks.map(task => processTask(task)))

    console.log('🔵 results:', results)
}

// parallel throttled
const parallelThrottled = async tasks => {
    const throttleLimit = 2,
          results = []

    let running = 0
    while (tasks.length) {
        //console.log('.')
        if (running === throttleLimit)
            continue

        console.log(`running: ${running}`)
        const task = tasks.shift()
        running++
        processTask(task)
            .then(out => {
                console.log('processed', task)
                running--
                results.push(out)
            }).catch(err => console.error)
    }

    console.log('🔵 results:', results)
}

const run = () => {
    parallelThrottled(tasks)
}
run()

