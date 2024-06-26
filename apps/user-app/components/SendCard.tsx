"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false)

    async function handleReq() {
        if (loading) return;

        setLoading(true);
        try {
            await p2pTransfer(number, Number(amount) * 100);

        } catch (error) {
            console.error("Transfer failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return <div >
        <Center>
            <Card title="Send Money">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={handleReq}>
                            {loading ? "Sending..." : "Send"}
                        </Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}