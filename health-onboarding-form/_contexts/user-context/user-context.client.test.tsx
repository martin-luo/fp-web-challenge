import { User } from "@/_actions/auth";
import { UserContextProvider, useUserContext } from "./user-context";
import {renderHook} from '@testing-library/react'

describe("UserContext", () => {
   describe("useUserContext", () => {
      it("should throw an error if used outside of UserContextProvider", () => {
         expect(() => renderHook(() => useUserContext())).toThrow(
            "useUserContext must be used within a UserContextProvider"
         );
      });

      it("should provide user data when used within UserContextProvider", () => {
         const mockUser: User = {
            id: "1",
            email: "test@example.com",
            name: "Test User",
            membershipType: "basic",
            memberSince: "2023-01-01"
         };


         const { result } = renderHook(() => useUserContext(), {
            wrapper: ({ children }) => (
               <UserContextProvider user={mockUser}>
                  {children}
               </UserContextProvider>
            )}
         );

         expect(result.current?.id).toBe(mockUser.id);
         expect(result.current?.email).toBe(mockUser.email);
         expect(result.current?.name).toBe(mockUser.name);
         expect(result.current?.membershipType).toBe(mockUser.membershipType);
         expect(result.current?.memberSince).toBe(mockUser.memberSince);
      });
   });
});
