import { renderHook, act } from "@testing-library/react-hooks"
import MockAdapter from "axios-mock-adapter"

import { useAuth, AuthProvider } from "../../hooks/auth"
import api from "../../services/api"

const apiMock = new MockAdapter(api)

describe("Auth Hook", () => {
    it("should be able to sign in", async () => {
        const apiResponse = {
            user: {
                id: "user123",
                name: "Jhon Doe",
                email: "jhondoe@email.com"
            },
            token: "token123"
        }

        apiMock.onPost("sessions").reply(200, apiResponse)

        const setItemSpy = jest.spyOn(Storage.prototype, "setItem")

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        result.current.signIn({
            email: "jhondoe@email.com",
            password: "123456"
        })

        await waitForNextUpdate()

        expect(setItemSpy).toHaveBeenCalledWith("GoBarber:token", apiResponse.token)
        expect(setItemSpy).toHaveBeenCalledWith("GoBarber:user", JSON.stringify(apiResponse.user))

        expect(result.current.user.email).toEqual("jhondoe@email.com")
    })

    it("should be able to get saved data from storage when auth inits", () => {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(key => {
            switch (key) {
                case "GoBarber:token":
                    return "token123"

                case "GoBarber:user":
                    return JSON.stringify({
                        id: "user123",
                        name: "Jhon Doe",
                        email: "jhondoe@email.com"
                    })
                default:
                    return null
            }
        })

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        expect(result.current.user.email).toEqual("jhondoe@email.com")
    })

    it("should be able sign out", async () => {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(key => {
            switch (key) {
                case "GoBarber:token":
                    return "token123"

                case "GoBarber:user":
                    return JSON.stringify({
                        id: "user123",
                        name: "Jhon Doe",
                        email: "jhondoe@email.com"
                    })
                default:
                    return null
            }
        })

        const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem")

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        act(() => {
            result.current.signOut()
        })

        expect(result.current.user).toBeUndefined()
        expect(removeItemSpy).toHaveBeenCalledTimes(2)
    })

    it("should be able to update the use", () => {
        const setItemSpy = jest.spyOn(Storage.prototype, "setItem")

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        const user = {
            id: "user123",
            name: "Jhon Doe",
            email: "jhondoe@email.com",
            avatar_url: "image.jpg",
        }

        act(() => {
            result.current.updateUser(user)
        })

        expect(setItemSpy).toHaveBeenCalledWith(
            "GoBarber:user",
            JSON.stringify(user)
        )

        expect(result.current.user).toEqual(user)
    })
})