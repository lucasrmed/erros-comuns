/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react"
interface TableProps {
    name: string;
    description: string;
}

export default function Table() {
    const [repos, setRepos] = useState<TableProps[]>([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        fetch('https://api.github.com/users/lucasrmed/repos')
            .then(response => response.json())
            .then(data => setRepos(data))
    }, [])

    const filteredRepos = search.length > 0
        ? repos.filter(repo => repo.name.includes(search))
        : []

    return (
        <>
            <input
                name="search"
                type="text"
                placeholder="Buscar..."
                onChange={e => setSearch(e.target.value)}
                value={search}
            />

            {search.length > 0 ? (
                <ul>
                    {filteredRepos.map(repos => {
                        return (
                            <li key={repos.name}>
                                {repos.name}
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <ul>
                    {repos.map(repos => {
                        return (
                            <li key={repos.name}>
                                {repos.name}
                            </li>
                        )
                    })}
                </ul>
            )}
        </>
    )
}