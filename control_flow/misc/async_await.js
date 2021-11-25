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
    return timerPromise(duration)
}

const tasks = [2000, 5000, 1000, 3000, 1500]

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
    const limit = 2,
          total = tasks.length,
          results = []
    
    let running = 0,
        completed = 0

    console.time('parallelThrottled')
    const next = () => {
        if (completed === total) {
            console.log('🔵 results:', results)
            console.timeEnd('parallelThrottled')
            return
        }

        while (running < limit && completed < total) {
            running++
            const task = tasks.shift()

            if (!task)
                continue

            processTask(task).then(out => {
                running--
                completed++
                results.push(out)
                next()
            })
        }
    }

    next()
}

const run = () => {
    parallelThrottled(tasks)
}
run()

